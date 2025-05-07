
import React from 'react';
import { Separator } from '@/components/ui/separator';

const TermsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Terms & Conditions</h1>
      
      <div className="bg-zinc-800 rounded-lg p-6 mb-8 border border-zinc-700">
        <p className="text-sm text-zinc-400 mb-4">Last Updated: May 1, 2023</p>
        
        <p className="text-zinc-300 mb-4">
          Welcome to DreamDate. Please read these Terms and Conditions carefully before using our service.
          By accessing or using DreamDate, you agree to be bound by these Terms.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. Acceptance of Terms</h2>
        <p className="text-zinc-300 mb-4">
          By creating a DreamDate account, whether through a mobile device, mobile application or computer 
          (collectively, the "Service") you agree to be bound by these Terms of Use. If you do not accept and 
          agree to be bound by all of the terms of this Agreement, you should not use the Service.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. Eligibility</h2>
        <p className="text-zinc-300 mb-4">
          You must be at least 18 years of age to create an account on DreamDate and use the Service. 
          By creating an account and using the Service, you represent and warrant that:
        </p>
        <ul className="list-disc pl-6 text-zinc-300 mb-4 space-y-2">
          <li>You can form a binding contract with DreamDate</li>
          <li>You are not a person who is barred from using the Service under the laws of your country of residence or any other applicable jurisdiction</li>
          <li>You will comply with this Agreement and all applicable local, state, national and international laws, rules and regulations</li>
          <li>You have never been convicted of a felony or indictable offense (or crime of similar severity), a sex crime, or any crime involving violence</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. Your Account</h2>
        <p className="text-zinc-300 mb-4">
          You are responsible for maintaining the confidentiality of your login credentials you use to sign up for DreamDate, 
          and you are solely responsible for all activities that occur under those credentials. 
          If you think someone has gained access to your account, please immediately contact customer support.
        </p>
        
        <Separator className="my-6" />
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">4. Safety; Your Interactions with Other Members</h2>
        <p className="text-zinc-300 mb-4">
          Though DreamDate strives to encourage a respectful member experience, it is not responsible for the conduct of any 
          member on or off of the Service. You agree to use caution in all interactions with other members, 
          particularly if you decide to communicate off the Service or meet in person.
        </p>
        
        <p className="text-zinc-300 mb-4">
          YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER MEMBERS. YOU UNDERSTAND THAT DREAMDATE 
          DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON ITS MEMBERS OR OTHERWISE INQUIRE INTO THE BACKGROUND OF ITS MEMBERS.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">5. Content</h2>
        <p className="text-zinc-300 mb-4">
          You are solely responsible for the content that you post, upload, publish, link to or otherwise 
          make available on the Service. You agree that we are only acting as a passive conduit for your online 
          distribution of your User Content.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">6. Rights you Grant DreamDate</h2>
        <p className="text-zinc-300 mb-4">
          By creating an account, you grant to DreamDate a worldwide, non-exclusive, royalty-free, 
          sublicensable, and transferable license to use, copy, distribute, and publish your content.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">7. Privacy Policy</h2>
        <p className="text-zinc-300 mb-4">
          For information about how we collect, use, and share your data, please see our Privacy Policy.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">8. Disclaimers</h2>
        <p className="text-zinc-300 mb-4">
          DREAMDATE PROVIDES THE SERVICE ON AN "AS IS" AND "AS AVAILABLE" BASIS AND GRANTS NO WARRANTIES OF ANY KIND.
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-6 mb-3">9. Contact Information</h2>
        <p className="text-zinc-300 mb-4">
          If you have any questions about these Terms, please contact us at: support@dreamdate.com
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
