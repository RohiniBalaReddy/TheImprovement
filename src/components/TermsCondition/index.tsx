
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <h2 className="mb-4 text-gray-600">
        Welcome to TheImprovement! These terms and conditions outline the rules and regulations for the use of our website.
      </h2>

      <h2 className="text-2xl font-Gordita-Medium mb-2">1. Introduction</h2>
      <p className="mb-4 text-gray-600">
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use TheImprovement if you do not agree to all of the terms and conditions stated on this page.
      </p>

      <h2 className="text-2xl font-Gordita-Medium mb-2">2. Cookies</h2>
      <p className="mb-4 text-gray-600">
        We employ the use of cookies. By accessing TheImprovement, you agreed to use cookies in agreement with our Privacy Policy.
      </p>

      <h2 className="text-2xl font-Gordita-Medium mb-2">3. License</h2>
      <p className="mb-4 text-gray-600">
        Unless otherwise stated, TheImprovement and/or its licensors own the intellectual property rights for all material on TheImprovement. All intellectual property rights are reserved. You may access this from TheImprovement for your personal use subject to restrictions set in these terms and conditions.
      </p>

      <ul className="list-disc pl-6 mb-4 text-gray-600">
        <li>You must not republish material from TheImprovement</li>
        <li>You must not sell, rent, or sub-license material from TheImprovement</li>
        <li>You must not reproduce, duplicate or copy material from TheImprovement</li>
        <li>You must not redistribute content from TheImprovement</li>
      </ul>

      <h2 className="text-2xl font-Gordita-Medium mb-2">4. Hyperlinking to Our Content</h2>
      <p className="mb-4 text-gray-600">
        Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas. TheImprovement does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of TheImprovement, its agents, or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions.
      </p>

      <h2 className="text-2xl font-Gordita-Medium mb-2">5. Governing Law</h2>
      <p className="mb-4 text-gray-600">
        These terms and conditions are governed by and construed in accordance with the laws of [Your Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      </p>

      <p className="mt-8">
        If you have any questions about these Terms and Conditions, please contact us at{' '}
        <a href="mailto:support@yourwebsite.com" className="text-[#5297ff] underline">support@yourwebsite.com</a>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
