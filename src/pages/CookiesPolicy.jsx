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

const CookiesPolicy = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
      <div className='mb-10'>
        <Title text1={'COOKIES'} text2={'POLICY'} />
      </div>

      <div className='max-w-4xl'>
        <div className='bg-gray-50 border border-gray-200 p-6 mb-10 text-sm text-gray-600 space-y-1'>
          <p className='font-semibold text-gray-800 text-base'>Cookies Policy – LOCOXO</p>
          <p><span className='font-semibold'>Last updated:</span> 17 July 2026</p>
          <p><span className='font-semibold'>Effective date:</span> 17 July 2026</p>
        </div>

        <p className='text-gray-600 text-sm leading-relaxed mb-10'>
          This Cookies Policy explains how LOCOXO, operated by LOCOXO APPARELS ("we", "us", "our"), uses cookies and similar
          tracking technologies on our website www.locoxo.com (the "Site"). It describes what cookies are, what types we use,
          why we use them, and how you can manage your cookie preferences.
        </p>

        <Section number='1' title='What Are Cookies?'>
          <p>
            Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a
            website. They help the website remember your actions and preferences over time, such as login status, items in
            your cart, language choice, and other settings.
          </p>
          <p>
            Cookies do not usually contain personally identifiable information, but data stored in cookies may be linked to
            your personal data (e.g., account ID, email hash) for purposes like personalization and analytics.
          </p>
          <p>
            In addition to cookies, we and our partners may use similar technologies such as pixels, tags, web beacons, local
            storage, and SDKs (collectively, "tracking technologies"). This policy covers all such technologies.
          </p>
          <p>
            For the purposes of India's Digital Personal Data Protection Act, 2023 (DPDPA), cookies and similar tracking
            technologies that can identify or be linked to you are treated as processing of personal data.
          </p>
        </Section>

        <Section number='2' title='Why We Use Cookies'>
          <p>We use cookies and similar technologies to:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Ensure the Site works correctly (e.g., login, cart, checkout, security).</li>
            <li>Remember your preferences (language, currency, recently viewed items).</li>
            <li>Analyze how visitors use the Site to improve performance and user experience.</li>
            <li>Personalize content and product recommendations.</li>
            <li>Measure the effectiveness of our marketing campaigns.</li>
            <li>Support fraud detection and prevention, including via our payment gateway.</li>
          </ul>
          <p>
            Under India's Digital Personal Data Protection Act, 2023 (DPDPA), cookies that process personal data generally
            require your explicit, informed, specific, and unambiguous consent, except for strictly necessary cookies needed
            to provide the service you requested.
          </p>
        </Section>

        <Section number='3' title='Types of Cookies We Use'>
          <div className='space-y-4'>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>3.1 Strictly Necessary (Essential) Cookies</h3>
              <p>These cookies are required for the basic functioning of the Site and cannot be switched off in our systems. They are usually set only in response to actions you make, such as logging in to your account, adding items to your cart and completing checkout, maintaining session security and preventing fraud (including via Cashfree Payment Gateway), and load balancing and basic security measures. These cookies do not require your consent under the DPDPA framework but are still described here for transparency.</p>
              <p className='mt-1 text-xs text-gray-500'>Legal basis: Performance of contract and legitimate interests (security, fraud prevention).</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>3.2 Functional / Preference Cookies</h3>
              <p>These cookies remember choices you make to provide enhanced, personalized features, such as language and region preferences, font size and display settings, and recently viewed products or saved filters.</p>
              <p className='mt-1 text-xs text-gray-500'>Legal basis: Legitimate interests (improving user experience) and, where required by law, your consent.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>3.3 Analytics / Performance Cookies</h3>
              <p>These cookies help us understand how visitors interact with the Site by collecting anonymous or pseudonymous information, such as pages visited and time spent, traffic sources and referral URLs, error logs and performance metrics, and device type, browser, and operating system. We use tools such as Google Analytics and Hotjar (if enabled) for analytics. Data is typically aggregated and does not directly identify you.</p>
              <p className='mt-1 text-xs text-gray-500'>Legal basis: Legitimate interests (site improvement) and, where required by law, your consent.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>3.4 Marketing / Advertising Cookies</h3>
              <p>These cookies are used to measure the performance of our ads on platforms like Meta (Facebook/Instagram) and Google Ads, build audience segments and show you relevant ads on other websites and apps, limit the number of times you see the same ad, and attribute conversions (e.g., purchases) to specific campaigns. We may use Meta Pixel, Google Ads tags, and similar tools. Some of these cookies may be set by third parties and may involve data transfers outside India.</p>
              <p className='mt-1 text-xs text-gray-500'>Legal basis: Your explicit consent. You can withdraw consent at any time via our cookie settings or browser controls.</p>
            </div>
          </div>
        </Section>

        <Section number='4' title='Which Cookies Require Consent?'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border border-gray-200 text-sm'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='border border-gray-200 px-3 py-2 font-semibold'>Cookie category</th>
                  <th className='border border-gray-200 px-3 py-2 font-semibold'>Consent required?</th>
                  <th className='border border-gray-200 px-3 py-2 font-semibold'>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-gray-200 px-3 py-2'>Strictly necessary</td>
                  <td className='border border-gray-200 px-3 py-2'>No (but must be disclosed)</td>
                  <td className='border border-gray-200 px-3 py-2'>Login session, cart, security tokens</td>
                </tr>
                <tr>
                  <td className='border border-gray-200 px-3 py-2'>Functional / preference</td>
                  <td className='border border-gray-200 px-3 py-2'>Yes</td>
                  <td className='border border-gray-200 px-3 py-2'>Language, saved filters</td>
                </tr>
                <tr>
                  <td className='border border-gray-200 px-3 py-2'>Analytics / performance</td>
                  <td className='border border-gray-200 px-3 py-2'>Yes</td>
                  <td className='border border-gray-200 px-3 py-2'>Google Analytics, Hotjar</td>
                </tr>
                <tr>
                  <td className='border border-gray-200 px-3 py-2'>Marketing / advertising</td>
                  <td className='border border-gray-200 px-3 py-2'>Yes</td>
                  <td className='border border-gray-200 px-3 py-2'>Meta Pixel, Google Ads</td>
                </tr>
                <tr>
                  <td className='border border-gray-200 px-3 py-2'>Third-party trackers</td>
                  <td className='border border-gray-200 px-3 py-2'>Yes</td>
                  <td className='border border-gray-200 px-3 py-2'>Social embeds, chatbot widgets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section number='5' title='First-Party vs Third-Party Cookies'>
          <p>
            First-party cookies are set directly by www.locoxo.com and are primarily used for essential functions, preferences,
            and first-party analytics.
          </p>
          <p>Third-party cookies are set by trusted partners, such as:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Cashfree Payments – for payment processing and fraud detection (essential).</li>
            <li>Google Analytics / Google Ads – for analytics and advertising.</li>
            <li>Meta (Facebook/Instagram) – for advertising and conversion tracking.</li>
            <li>Hotjar (if used) – for behavior analytics (heatmaps, session recordings).</li>
          </ul>
          <p>These third parties have their own privacy and cookies policies, which we encourage you to review.</p>
        </Section>

        <Section number='6' title='How Long Cookies Last'>
          <p>Cookie durations vary by type and purpose:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Session cookies: Expire when you close your browser (e.g., cart session, login session).</li>
            <li>Persistent cookies: Remain on your device for a set period, ranging from a few days to up to 2 years, depending on the cookie.</li>
            <li>Analytics cookies: often 12–24 months.</li>
            <li>Marketing cookies: often 30 days to 1 year (or as defined by the provider).</li>
            <li>Preference cookies: often 6–12 months.</li>
          </ul>
          <p>Exact durations for each cookie are listed in our cookie declaration (if implemented via a consent manager).</p>
        </Section>

        <Section number='7' title='How We Meet DPDPA Notice & Consent Requirements'>
          <p>
            Our cookie notice and this policy are designed to meet notice requirements under India's Digital Personal Data
            Protection Act, 2023 (DPDPA) and DPDP Rules 2025, including:
          </p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Clear identity and contact details of the data fiduciary (LOCOXO APPARELS).</li>
            <li>Plain-language description of what data is collected via cookies and why.</li>
            <li>Separate explanation of each purpose (essential, analytics, marketing, personalization).</li>
            <li>Information on data retention periods for cookie-based data.</li>
            <li>Details of third parties that receive cookie data and links to their policies.</li>
            <li>Clear explanation of your right to withdraw consent and how to do it.</li>
          </ul>
          <p>In line with DPDPA and DPDP Rules 2025, your consent for cookies must be:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li><span className='font-semibold'>Free:</span> Not forced as a condition of using the Site, except for strictly necessary cookies.</li>
            <li><span className='font-semibold'>Specific:</span> Separate for each purpose (e.g., analytics, marketing, personalization).</li>
            <li><span className='font-semibold'>Informed:</span> You are told what data is collected and why.</li>
            <li><span className='font-semibold'>Unambiguous:</span> Given through a clear affirmative action (e.g., clicking "Accept"). Pre-ticked boxes or passive browsing do not count as consent.</li>
          </ul>
        </Section>

        <Section number='8' title='How to Manage Your Cookie Preferences'>
          <h3 className='font-semibold text-gray-800'>8.1 Cookie Banner / Consent Manager</h3>
          <p>
            When you first visit the Site, you may see a cookie banner or consent notice asking you to choose which categories
            of cookies to accept. You can accept all cookies, reject non-essential cookies, or customize your choices by
            category (e.g., accept analytics but reject marketing).
          </p>
          <p>
            You can change your preferences at any time by clicking the "Cookie Settings" or "Manage Cookies" link in the
            footer of our Site (where available). Withdrawing consent does not affect the lawfulness of processing based on
            your earlier consent and does not prevent the use of strictly necessary cookies required to operate the Site.
          </p>
          <h3 className='font-semibold text-gray-800'>8.2 Browser Controls</h3>
          <p>You can also manage or delete cookies through your browser settings: block all cookies or block third-party cookies, delete cookies for specific sites or all sites, and clear browsing data (cookies, cache, history). Note: Disabling certain cookies may affect Site functionality (e.g., cart, login, personalized features).</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
            <li>Firefox: Options/Preferences → Privacy &amp; Security → Cookies and Site Data</li>
            <li>Safari: Preferences → Privacy → Cookies and website data</li>
            <li>Edge: Settings → Cookies and site permissions</li>
          </ul>
          <h3 className='font-semibold text-gray-800'>8.3 Opt-Out of Interest-Based Ads</h3>
          <p>You can opt out of personalized advertising from major providers:</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Google Ads: <a href='https://adssettings.google.com' target='_blank' rel='noopener noreferrer' className='underline hover:text-black'>adssettings.google.com</a></li>
            <li>Meta (Facebook): <a href='https://www.facebook.com/ads/preferences' target='_blank' rel='noopener noreferrer' className='underline hover:text-black'>facebook.com/ads/preferences</a></li>
            <li>Industry opt-outs (region-dependent): e.g., NAI, DAA, EDAA portals</li>
          </ul>
          <p>Opting out does not stop all ads; it only stops interest-based personalization.</p>
        </Section>

        <Section number='9' title='Product Colour Disclaimer'>
          <p>
            The product colours shown in the photographs may vary slightly from the actual product due to factors such as
            lighting during the photoshoot, camera settings, and the screen resolution and display settings of your device.
          </p>
          <p>
            This disclaimer applies to all product images displayed on www.locoxo.com and our social media channels. Minor
            variations in colour do not constitute a defect and are not eligible for return or exchange on that basis alone,
            unless otherwise stated in our Return &amp; Refund Policy.
          </p>
        </Section>

        <Section number='10' title='Updates to This Cookies Policy'>
          <p>
            We may update this Cookies Policy from time to time to reflect changes in our practices, technology, or legal
            requirements. The "Last updated" date at the top will be revised. Significant changes will be notified via a
            banner on the Site, email, or other appropriate means. We encourage you to review this page periodically.
            Continued use of the Site after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section number='11' title='Contact Us'>
          <p>If you have any questions about our use of cookies or this Cookies Policy, you can contact us at:</p>
          <div className='bg-gray-50 border border-gray-200 p-4 mt-2'>
            <p className='font-semibold text-gray-800'>LOCOXO APPARELS</p>
            <p>Email: <a href='mailto:locoxo.support@gmail.com' className='underline hover:text-black'>locoxo.support@gmail.com</a> (monitored daily)</p>
            <p>Phone: +91 88245 89682 (Available Monday to Saturday, 10:00 AM to 8:00 PM IST; Sunday closed)</p>
            <p>Address: 2400/67, Friends Colony, Street No. 2, Badi Haibowal, Ludhiana, Punjab – 141001, India</p>
          </div>
          <p>We aim to respond to cookie-related queries within 15 days.</p>
        </Section>
      </div>
    </div>
  )
}

export default CookiesPolicy
