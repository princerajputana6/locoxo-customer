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
          <p className='font-semibold text-gray-800 text-base'>Privacy Policy – LOCOXO</p>
          <p><span className='font-semibold'>Last updated:</span> 17 July 2026</p>
          <p><span className='font-semibold'>Effective date:</span> 17 July 2026</p>
        </div>

        <p className='text-gray-600 text-sm leading-relaxed mb-4'>
          This Privacy Policy explains how LOCOXO, operated by LOCOXO APPARELS ("we", "us", "our"), collects, uses, shares,
          and protects your personal data when you use our website www.locoxo.com (the "Site") and purchase our products in India.
        </p>
        <p className='text-gray-600 text-sm leading-relaxed mb-10'>
          By using the Site and placing orders, you agree to the practices described in this policy. If you do not agree,
          please do not use the Site.
        </p>

        <Section number='1' title='Who We Are (Data Controller)'>
          <p>Legal name: LOCOXO APPARELS</p>
          <p>Brand name: LOCOXO</p>
          <p>Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab – 141001, India</p>
          <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> | Phone: +91 88245 89682</p>
          <p>We are the data controller for your personal data under India's Digital Personal Data Protection Act, 2023 (DPDPA).</p>
        </Section>

        <Section number='2' title='Personal Data We Collect'>
          <h3 className='font-semibold text-gray-800'>2.1 Data you provide directly</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>Account &amp; profile data: name, email address, mobile number, password, delivery addresses, Pincode.</li>
            <li>Order &amp; payment data: billing/shipping address, order details, transaction ID, payment method (via Cashfree Payment Gateway). We do not store full card numbers or CVV on our servers.</li>
            <li>Communication data: messages you send to customer support, reviews, feedback, survey responses.</li>
            <li>Marketing data: WhatsApp number, social media handles (if you connect accounts), newsletter preferences, responses to promotions.</li>
            <li>Wishlist &amp; loyalty data: products you save, loyalty program ID, points, redemption history.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>2.2 Data collected automatically</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>Device &amp; usage data: IP address, browser type and version, device type, operating system, pages visited, time spent, referral URL, clickstream data.</li>
            <li>Log data: server logs, error logs, timestamps, and actions on the Site.</li>
            <li>Cookie &amp; tracking data: information from cookies and similar technologies (see Section 7).</li>
          </ul>
          <p>We do not intentionally collect sensitive personal data such as health, religion, biometrics, or government IDs, except where required by law (e.g., for high-value transactions if applicable).</p>
        </Section>

        <Section number='3' title='How and Why We Use Your Data (Purposes & Legal Basis)'>
          <h3 className='font-semibold text-gray-800'>3.1 Order processing and delivery (Contract / Legal Obligation)</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>To create and manage your account and orders.</li>
            <li>To process payments via Cashfree Payment Gateway and detect/prevent fraud.</li>
            <li>To arrange shipping, track deliveries, and handle returns, refunds, and exchanges.</li>
            <li>To send order confirmations, dispatch updates, and delivery notifications (SMS/WhatsApp/email).</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>3.2 Customer support and service quality (Contract / Legitimate Interest)</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>To respond to your queries, complaints, and support requests.</li>
            <li>To improve our products, Site, and customer experience.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>3.3 Marketing and promotions (Consent / Legitimate Interest)</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>To send promotional offers, new product launches, and personalized recommendations via email, SMS, and WhatsApp, where you have opted in.</li>
            <li>To run contests, loyalty programs, and referral schemes.</li>
            <li>To show you relevant ads on social media and other platforms (e.g., Meta, Google) using your email/phone in hashed form.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>3.4 Analytics, personalization, and site improvement (Legitimate Interest / Consent)</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>To analyze how users interact with the Site using tools like Google Analytics, Meta Pixel, and Hotjar (anonymized or aggregated where possible).</li>
            <li>To personalize product recommendations, banners, and content.</li>
            <li>To test new features and fix bugs.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>3.5 Fraud prevention, security, and legal compliance (Legal Obligation / Legitimate Interest)</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>To detect and prevent fraud, abuse, and unauthorized transactions.</li>
            <li>To comply with applicable laws, tax, GST, e-invoicing, and other regulatory requirements.</li>
            <li>To respond to lawful requests from government or law enforcement authorities.</li>
          </ul>
        </Section>

        <Section number='4' title='How We Share Your Data'>
          <p>We do not sell your personal data. We share data only with the following categories of third parties, and only as needed:</p>
          <ul className='list-disc list-inside space-y-2'>
            <li><span className='font-semibold'>Payment processors:</span> Cashfree Payments – to process card, UPI, net banking, and wallet payments. We receive only transaction status and reference details.</li>
            <li><span className='font-semibold'>Logistics and shipping partners:</span> Courier and delivery partners (e.g., Delhivery, Shiprocket, Ecom Express, or similar). Data shared: name, phone number, delivery address, order details.</li>
            <li><span className='font-semibold'>Analytics and advertising partners:</span> Google Analytics, Meta Pixel (Facebook/Instagram), and Hotjar (if used). These partners may receive pseudonymized or aggregated data; some processing may occur on servers outside India, based on your consent.</li>
            <li><span className='font-semibold'>Customer support and communication tools:</span> Email/WhatsApp/SMS providers and CRM tools (e.g., Interakt, Klaviyo, Mailchimp, or similar).</li>
            <li><span className='font-semibold'>Hosting, security, and infrastructure:</span> Web hosting, CDN, and cloud providers (e.g., AWS, Cloudflare, or similar).</li>
            <li><span className='font-semibold'>Legal and regulatory authorities:</span> when required by law or to protect our rights and safety.</li>
          </ul>
          <p>All third parties are contractually required to protect your data and use it only for the specified purposes.</p>
        </Section>

        <Section number='5' title='International Data Transfers'>
          <p>
            Currently, we do not intentionally transfer your personal data outside India, except where a third-party service
            provider's infrastructure may process or store certain non-sensitive data (e.g., analytics, ads) on servers outside
            India. Where such transfers occur, we rely on applicable legal frameworks and contractual safeguards under DPDPA
            and other laws, and on your consent where required.
          </p>
        </Section>

        <Section number='6' title='Data Retention – How Long We Keep Your Data'>
          <p>We retain your personal data only as long as necessary for the purposes described in this policy and as required by law. Typical retention periods:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Account data (name, email, phone, address): retained while your account is active and for up to 3 years after your last activity, unless you request earlier deletion.</li>
            <li>Order and transaction data: retained for at least 6–8 years to comply with Income Tax, GST, and Companies Act requirements.</li>
            <li>Billing and tax records: retained for 6–8 years as per Indian tax laws.</li>
            <li>Customer support records: retained for up to 3 years after resolution of the issue.</li>
            <li>Marketing lists: retained until you unsubscribe or request deletion; we may keep a minimal record to honor your opt-out.</li>
            <li>Logs and analytics data: retained for up to 12–24 months, depending on the tool's default retention.</li>
          </ul>
          <p>After the retention period, we delete or anonymize your data, unless we must retain it for legal claims or regulatory requirements.</p>
        </Section>

        <Section number='7' title='Cookies and Tracking Technologies'>
          <p>We use cookies and similar technologies to operate the Site, analyze usage, and personalize content and ads.</p>
          <h3 className='font-semibold text-gray-800'>7.1 Types of cookies we use</h3>
          <ul className='list-disc list-inside space-y-1'>
            <li>Essential / strictly necessary cookies: for login, session management, cart, and security (including fraud detection via Cashfree).</li>
            <li>Analytics cookies: to understand how visitors use the Site (e.g., Google Analytics, Hotjar).</li>
            <li>Marketing / advertising cookies: to show relevant ads and measure campaign performance (e.g., Meta Pixel, Google Ads).</li>
            <li>Functional / personalization cookies: to remember your preferences, language, and show personalized recommendations.</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>7.2 Managing your cookie preferences</h3>
          <p>Where technically feasible, we will provide a cookie banner or settings page to let you choose which non-essential cookies to accept. You can also adjust your browser settings to block or delete cookies, and use opt-out tools provided by Google and Meta for interest-based ads. Note that disabling some cookies may affect Site functionality or personalization.</p>
        </Section>

        <Section number='8' title='Data Security Measures'>
          <p>We implement reasonable technical and organizational measures to protect your personal data against unauthorized access, loss, misuse, or disclosure, including:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Encryption in transit: HTTPS/TLS for all data between your device and our servers.</li>
            <li>Secure payment processing: we use Cashfree, a PCI-DSS compliant payment gateway; we do not store full card details or CVV.</li>
            <li>Access controls: limited employee access to personal data based on role.</li>
            <li>Regular reviews: periodic review of security practices and vendor contracts.</li>
          </ul>
          <p>While we strive to protect your data, no online system is 100% secure. We will notify you of any material data breach as required by applicable law.</p>
        </Section>

        <Section number='9' title='Your Rights and Choices'>
          <p>Under India's DPDPA and other applicable laws, you have the following rights regarding your personal data:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li><span className='font-semibold'>Right to access:</span> request a copy of the personal data we hold about you.</li>
            <li><span className='font-semibold'>Right to correction:</span> request correction of inaccurate or incomplete data.</li>
            <li><span className='font-semibold'>Right to erasure (deletion):</span> request deletion of your data, subject to legal and contractual obligations (e.g., we must retain certain order/tax records for 6–8 years).</li>
            <li><span className='font-semibold'>Right to data portability:</span> request your data in a structured, machine-readable format where applicable.</li>
            <li><span className='font-semibold'>Right to withdraw consent:</span> where processing is based on your consent (e.g., marketing), you may withdraw it at any time. Withdrawal does not affect past processing.</li>
            <li><span className='font-semibold'>Right to object / opt-out:</span> opt out of marketing communications and certain types of profiling.</li>
          </ul>
          <p>
            <span className='font-semibold'>How to exercise your rights:</span> Email us at <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> with
            subject line "Privacy Request – [Your Name]". Include your name, registered email, mobile number, and order ID (if
            relevant) to help us verify your identity. We aim to respond within 15 days and will inform you if additional time
            is needed due to complexity or legal requirements.
          </p>
        </Section>

        <Section number='10' title='Marketing Communications and Opt-Out'>
          <p>You may receive transactional messages (order updates, delivery, returns) — these are necessary for your purchases and cannot be opted out of while you have active orders — and marketing messages (offers, new arrivals, loyalty updates) via email, SMS, and WhatsApp, only if you have opted in.</p>
          <p>You can opt out of marketing at any time by:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Clicking the "Unsubscribe" link in our emails.</li>
            <li>Replying "STOP" to our SMS/WhatsApp marketing messages.</li>
            <li>Contacting us at locoxo.support@gmail.com to update your preferences.</li>
          </ul>
          <p>Even after opting out, we may still send you necessary service messages related to your orders or account.</p>
        </Section>

        <Section number='11' title="Children's Privacy and Age Restriction">
          <p>
            Our Site and services are intended for users aged 18 years or older. We do not knowingly collect personal data
            from children under 18. If we become aware that we have inadvertently collected data from someone under 18, we
            will take steps to delete such data as soon as possible, subject to legal retention requirements.
          </p>
        </Section>

        <Section number='12' title='Changes to This Privacy Policy'>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
            The "Last updated" date at the top will be revised. Significant changes will be notified via email, Site banner,
            or other appropriate means. Continued use of the Site after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section number='13' title='Contact and Grievance Redressal'>
          <p>For any privacy-related questions, concerns, or complaints, please contact us:</p>
          <div className='bg-gray-50 border border-gray-200 p-4 mt-2'>
            <p className='font-semibold text-gray-800'>LOCOXO APPARELS</p>
            <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> (monitored daily)</p>
            <p>Phone: +91 88245 89682 (Available Monday to Saturday, 10:00 AM to 8:00 PM IST; Sunday closed)</p>
            <p>Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab – 141001, India</p>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
