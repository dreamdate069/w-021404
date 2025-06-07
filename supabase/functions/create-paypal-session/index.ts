
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { packageId, userId } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get coin package details
    const { data: coinPackage, error: packageError } = await supabase
      .from('coin_packages')
      .select('*')
      .eq('id', packageId)
      .eq('is_active', true)
      .single();

    if (packageError || !coinPackage) {
      throw new Error('Invalid coin package');
    }

    // Get PayPal access token
    const clientId = Deno.env.get('PAYPAL_CLIENT_ID');
    const clientSecret = Deno.env.get('PAYPAL_CLIENT_SECRET');
    
    const authResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    const authData = await authResponse.json();
    
    // Create PayPal order
    const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.access_token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: coinPackage.price_usd.toString()
          },
          description: `${coinPackage.name} - ${coinPackage.dreamcoins + coinPackage.bonus_coins} DreamCoins`
        }],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              user_action: 'PAY_NOW',
              return_url: `${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/functions/v1/verify-payment`,
              cancel_url: `${req.headers.get('origin')}/payment-cancelled`
            }
          }
        }
      })
    });

    const orderData = await orderResponse.json();

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        payment_method: 'paypal',
        payment_provider_id: orderData.id,
        amount_usd: coinPackage.price_usd,
        dreamcoins_purchased: coinPackage.dreamcoins,
        bonus_coins: coinPackage.bonus_coins,
        status: 'pending',
        payment_data: orderData
      });

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      throw new Error('Failed to create payment record');
    }

    return new Response(JSON.stringify({
      orderId: orderData.id,
      approvalUrl: orderData.links?.find(link => link.rel === 'approve')?.href
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating PayPal session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
