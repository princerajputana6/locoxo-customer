import React from 'react'
import Title from '../components/Title'

const Section = ({ title, children }) => (
  <div className='mb-8'>
    <h2 className='text-base font-bold tracking-wide mb-3 border-l-4 border-black pl-4'>{title}</h2>
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
          <p><span className='font-semibold'>Effective Date:</span> 17 May 2026</p>
          <p><span className='font-semibold'>Website:</span> www.locoxo.com</p>
          <p><span className='font-semibold'>Company:</span> Locoxo Apparels</p>
          <p><span className='font-semibold'>Contact Email:</span> <a href='mailto:id-support@locoxo.com' className='underline hover:text-black'>id-support@locoxo.com</a></p>
        </div>

        <Section title='Introduction'>
          <p>
            This Cookies Policy explains how Locoxo Apparels ("Company", "we", "our", or "us") uses cookies and similar technologies when you visit or interact with www.locoxo.com. It explains what cookies are, why they are used, the types of cookies that may be used on the website, and the choices available to website visitors regarding those cookies.
          </p>
        </Section>

        <Section title='What Are Cookies?'>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember user preferences, improve performance, maintain sessions, and collect information about how visitors use a site.
          </p>
        </Section>

        <Section title='How Cookies Are Used'>
          <p>
            Locoxo Apparels uses cookies and similar technologies to operate the website, provide core shopping features, remember your preferences, keep your session active, help secure the website, analyze traffic, and support marketing and advertising activities where permitted.
          </p>
          <p>
            For an e-commerce clothing website, cookies may also be used to remember items placed in a shopping cart, support login or checkout functionality, understand customer behavior, and improve product discovery and overall user experience.
          </p>
        </Section>

        <Section title='Categories of Cookies'>
          <p>The website may use the following categories of cookies:</p>
          <div className='space-y-4 mt-2'>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Strictly Necessary Cookies</h3>
              <p>These cookies are essential for the operation of the website and enable important features such as page navigation, security, shopping cart use, checkout, and access to secure areas. Certain strictly necessary cookies do not require prior consent when they are used solely to provide a service specifically requested by the user.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Functional Cookies</h3>
              <p>These cookies allow the website to remember choices made by users, such as language, location, and saved preferences, so that a more personalized experience can be provided.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Analytics Cookies</h3>
              <p>These cookies help measure how visitors interact with the website, including which pages are viewed most often and how users move through the website. Analytics cookies generally require consent when they are not strictly necessary.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Marketing Cookies</h3>
              <p>These cookies may be used to show relevant advertisements, limit how often ads are seen, and measure the effectiveness of advertising campaigns. Marketing and advertising cookies generally require user consent before being placed on a device.</p>
            </div>
            <div className='bg-white border border-gray-200 p-4'>
              <h3 className='font-semibold text-gray-800 mb-1'>Third-Party Cookies</h3>
              <p>Some cookies may be placed by third-party service providers such as analytics vendors, advertising partners, embedded service providers, payment processors, or social media integrations. These third parties may process information according to their own privacy notices.</p>
            </div>
          </div>
        </Section>

        <Section title='Consent and Control'>
          <p>
            Where required by applicable law, non-essential cookies such as analytics, advertising, and certain third-party cookies will only be placed after the user has provided consent. Consent for different cookie purposes should be specific, and users should be able to withdraw consent as easily as they gave it.
          </p>
          <p>
            Users may manage cookie preferences through the cookie banner or consent tool made available on the website, where applicable. In addition, most web browsers allow users to control, block, or delete cookies through browser settings, although disabling some cookies may affect website functionality.
          </p>
        </Section>

        <Section title='Third-Party Services'>
          <p>
            Locoxo Apparels may use trusted third-party tools or services for analytics, payment processing, advertising, customer support, social media integrations, or website performance monitoring. When such services place cookies or similar technologies, those cookies are governed in part by the relevant third party's own policies and practices.
          </p>
        </Section>

        <Section title='Updates to This Policy'>
          <p>
            This Cookies Policy may be updated from time to time to reflect changes in applicable law, technology, business operations, or the cookies used on the website. Any updates will be posted on this page with a revised effective date.
          </p>
        </Section>

        <Section title='Contact Information'>
          <p>For any questions about this Cookies Policy or the use of cookies on the website, please contact:</p>
          <div className='bg-gray-50 border border-gray-200 p-4 mt-2'>
            <p className='font-semibold text-gray-800'>Locoxo Apparels</p>
            <p>Website: www.locoxo.com</p>
            <p>Email: <a href='mailto:id-support@locoxo.com' className='underline hover:text-black'>id-support@locoxo.com</a></p>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default CookiesPolicy
