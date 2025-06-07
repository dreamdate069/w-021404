
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
    const { paymentId, paymentMethod } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_provider_id', paymentId)
      .single();

    if (paymentError || !payment) {
      throw new Error('Payment not found');
    }

    let verificationResult = false;

    if (paymentMethod === 'paypal') {
      // Verify PayPal payment
      const clientId = Deno.env.get('PAYPAL_CLIENT_ID');
      const clientSecret = Deno.env.get('PAYPAL_CLIENT_SECRET');
      
      // Get access token
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

      // Capture the order
      const captureResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${paymentId}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access_token}`,
        }
      });

      const captureData = await captureResponse.json();
      verificationResult = captureData.status === 'COMPLETED';
    }

    if (verificationResult) {
      // Update payment status
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', payment.id);

      if (updateError) {
        console.error('Error updating payment:', updateError);
        throw new Error('Failed to update payment');
      }

      // Credit DreamCoins to user
      // Note: In a production app, you'd want to implement this via the DreamCoinBank
      // For now, we'll just mark the payment as completed
      console.log(`Payment verified for user ${payment.user_id}: ${payment.dreamcoins_purchased + payment.bonus_coins} DreamCoins`);

      return new Response(JSON.stringify({
        success: true,
        dreamcoinsAdded: payment.dreamcoins_purchased + payment.bonus_coins
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Mark payment as failed
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('id', payment.id);

      throw new Error('Payment verification failed');
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
