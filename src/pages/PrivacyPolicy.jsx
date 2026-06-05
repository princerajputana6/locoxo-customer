import React from 'react'
import Title from '../components/Title'

const Section = ({ number, title, children }) => (
  <div className='mb-8'>
    <h2 className='text-base font-bold tracking-wide mb-3 border-l-4 border-black pl-4'>
      {number}. {title}
    </h2>
    <div className='text-gray-600 leading-relaxed text-sm space-y-3 pl-4'>{children}</div>
  </div>
)

const PrivacyPolicy = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'PRIVACY'} text2={'POLICY'} />
      </div>

      <div className='max-w-4xl'>
        <div className='bg-gray-50 border border-gray-200 p-6 mb-10 text-sm text-gray-600 space-y-1'>
          <p className='font-semibold text-gray-800 text-base'>LOCOXO APPARELS</p>
          <p><span className='font-semibold'>Website:</span> www.locoxo.com</p>
          <p><span className='font-semibold'>Effective Date:</span> 18 May 2026</p>
        </div>

        <p className='text-gray-600 text-sm leading-relaxed mb-10'>
          LOCOXO APPARELS ("we", "our", "us") operates the website www.locoxo.com. We respect your privacy and are committed to protecting the personal data you share with us when you visit our website, create an account, place an order, or otherwise interact with our services.
        </p>
        <p className='text-gray-600 text-sm leading-relaxed mb-10'>
          This Privacy Policy explains how we collect, use, disclose, store, and protect your personal information in connection with our online clothing business and related services.
        </p>

        <Section number='1' title='Information We Collect'>
          <p>We may collect the following categories of personal information:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Identity information, such as your name.</li>
            <li>Contact information, such as your email address, phone number, billing address, and shipping address.</li>
            <li>Account information, if you register on our website, including login credentials and profile details.</li>
            <li>Order and transaction information, including products purchased, payment status, delivery information, returns, refunds, and related records.</li>
            <li>Communication information, including messages, support requests, complaints, and feedback.</li>
            <li>Technical information, such as IP address, browser type, device identifiers, operating system, pages viewed, time spent on pages, referring URLs, and interaction data.</li>
            <li>Cookies, pixels, and similar tracking data used for analytics, advertising, and website functionality.</li>
          </ul>
        </Section>

        <Section number='2' title='How We Collect Information'>
          <p>We collect personal information when you:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Browse or use our website.</li>
            <li>Create an account or log in.</li>
            <li>Place an order or make a payment.</li>
            <li>Subscribe to our newsletter or marketing communications.</li>
            <li>Contact us by email or through customer support channels.</li>
            <li>Submit reviews, ratings, or other content.</li>
            <li>Interact with cookies, Google Analytics, Meta Pixel, or similar tracking technologies.</li>
          </ul>
        </Section>

        <Section number='3' title='Use of Information'>
          <p>We use personal information for lawful business purposes, including:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Processing and fulfilling orders.</li>
            <li>Delivering products and managing logistics.</li>
            <li>Processing payments through third-party payment services.</li>
            <li>Providing customer support and responding to queries.</li>
            <li>Managing accounts, returns, exchanges, and refunds.</li>
            <li>Sending order confirmations, service notices, and marketing communications where permitted.</li>
            <li>Improving our website, products, and customer experience.</li>
            <li>Measuring performance, traffic, and marketing effectiveness.</li>
            <li>Detecting fraud, abuse, and unauthorized activity.</li>
            <li>Complying with legal, tax, accounting, and regulatory obligations.</li>
          </ul>
        </Section>

        <Section number='4' title='Payment Processing'>
          <p>
            We use Razorpay as our payment gateway. Payment-related data is processed by Razorpay and/or its authorized partners in accordance with their own privacy and security practices.
          </p>
          <p>
            We do not intentionally store full card details such as card number, CVV, or other sensitive payment authentication data on our own systems, except where required for transaction records or legal compliance.
          </p>
        </Section>

        <Section number='5' title='Cookies, Google Analytics, and Meta Pixel'>
          <p>
            We use cookies and similar technologies to operate the website, remember preferences, maintain shopping cart functionality, analyze traffic, and support marketing activities.
          </p>
          <p>We also use:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li><span className='font-semibold'>Google Analytics</span> – to understand website usage, page performance, and user behavior.</li>
            <li><span className='font-semibold'>Meta Pixel</span> – to measure advertising performance, support retargeting, and improve marketing campaigns.</li>
          </ul>
          <p className='mt-2'>
            These tools may collect technical and usage information such as device identifiers, IP address, browser data, pages visited, clicks, and conversions.
          </p>
          <p>
            You can manage cookies through your browser settings, and where required by applicable law, through on-site consent controls.
          </p>
        </Section>

        <Section number='6' title='Disclosure of Information'>
          <p>We do <span className='font-semibold'>not sell</span> your personal information.</p>
          <p>We may disclose personal information only where necessary for legitimate business purposes, including to:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Payment service providers.</li>
            <li>Shipping, courier, and logistics partners.</li>
            <li>Hosting, cloud, IT, security, and support service providers.</li>
            <li>Analytics and advertising service providers, including Google and Meta-related tools.</li>
            <li>Professional advisers, auditors, and legal consultants.</li>
            <li>Government authorities, courts, or regulators when required by law.</li>
          </ul>
          <p className='mt-2'>
            Any third party that processes personal information on our behalf is expected to use it only for the agreed purpose and to maintain reasonable safeguards.
          </p>
        </Section>

        <Section number='7' title='Data Retention'>
          <p>We retain personal information only for as long as reasonably necessary to:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Complete transactions and provide services.</li>
            <li>Maintain business, accounting, and tax records.</li>
            <li>Resolve disputes and enforce agreements.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>
          <p className='mt-2'>
            When personal data is no longer required, we will take reasonable steps to delete, anonymize, or securely archive it, subject to applicable legal requirements.
          </p>
        </Section>

        <Section number='8' title='Security'>
          <p>
            We implement reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.
          </p>
          <p>
            However, no method of transmission over the internet or electronic storage is fully secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section number='9' title='OTP Authentication and Security Verification'>
          <p>
            We may use one-time passwords ("OTP"), email verification codes, SMS verification codes, or similar authentication methods to verify your identity, secure your account, and protect against unauthorized access. We may also use OTP or other verification steps during registration, login, password reset, account recovery, order confirmation, and certain payment or transaction-related actions.
          </p>
          <p>
            Where required, OTPs or verification codes may be sent to the mobile number or email address provided by you. You are responsible for ensuring that your contact details remain accurate and accessible.
          </p>
          <p>
            OTP information is used only for authentication, security, and fraud prevention purposes. It is not used for marketing purposes.
          </p>
        </Section>

        <Section number='10' title='Your Rights'>
          <p>Subject to applicable law, you may have the right to:</p>
          <ul className='list-disc list-inside space-y-1 mt-2'>
            <li>Access your personal information.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of your personal information where permitted by law.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Object to or restrict certain processing activities.</li>
            <li>Opt out of marketing emails.</li>
          </ul>
          <p className='mt-2'>
            To exercise these rights, contact us at <a href='mailto:email-support@locoxo.com' className='underline hover:text-black'>email-support@locoxo.com</a>.
          </p>
        </Section>

        <Section number='11' title='Marketing Communications'>
          <p>
            If you opt in to receive promotional emails, we may send you offers, product updates, and news about LOCOXO APPARELS.
          </p>
          <p>
            You may unsubscribe from marketing communications at any time by using the unsubscribe link in the email or by contacting us directly.
          </p>
        </Section>

        <Section number='12' title="Children's Privacy">
          <p>Our website is intended for general consumer use and is not directed to children.</p>
          <p>We do not knowingly collect personal information from children without appropriate consent where required by law.</p>
        </Section>

        <Section number='13' title='Third-Party Links'>
          <p>Our website may contain links to third-party websites or services.</p>
          <p>We are not responsible for the privacy practices, security, or content of those third-party platforms.</p>
          <p>We recommend reviewing their privacy policies before providing any personal information.</p>
        </Section>

        <Section number='14' title='International Transfers'>
          <p>
            If you access our website from outside India, your personal information may be processed in India or in other countries where our service providers operate.
          </p>
          <p>
            By using our website, you consent to such processing to the extent permitted by applicable law.
          </p>
        </Section>

        <Section number='15' title='Changes to This Policy'>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our business, technology, or legal requirements.
          </p>
          <p>Any updated version will be posted on this page with a revised effective date.</p>
        </Section>

        <Section number='16' title='Contact Us'>
          <div className='bg-gray-50 border border-gray-200 p-5'>
            <p className='font-semibold text-gray-800 mb-2'>LOCOXO APPARELS</p>
            <p>Building No./Flat No.: 2400/67</p>
            <p>Friends Colony, Street No. 2</p>
            <p>Near Rohit Trading Company</p>
            <p>Badi Haibowal, Ludhiana, Punjab 141001</p>
            <p>India</p>
            <p className='mt-2'>Email: <a href='mailto:email-support@locoxo.com' className='underline hover:text-black'>email-support@locoxo.com</a></p>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
