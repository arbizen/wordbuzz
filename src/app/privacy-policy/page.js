import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#101619] text-slate-50 h-screen w-screen p-[32px] md:p-[52px] overflow-y-scroll">
      <h1 className="text-[48px] font-bold leading-tight mb-6">
        Privacy Policy
      </h1>
      <div className="flex flex-col gap-4">
        <p>Effective Date: 16/12/2023</p>
        <p>
          Thank you for choosing Wordbuzz! This Privacy Policy is designed to
          help you understand how your personal information is collected, used,
          and safeguarded when you use our game, Wordbuzz, which integrates
          Google and GitHub OAuth for authentication purposes. By using
          Wordbuzz, you agree to the collection and use of information as
          described in this Privacy Policy. Please read this policy carefully to
          understand our practices regarding your personal data.{" "}
        </p>
        <h3 className="text-3xl font-bold">Information We Collect</h3>
        <ul>
          <li>
            Google OAuth: When you choose to log in or sign up using Google
            OAuth, Wordbuzz will collect and store your Google account
            information, including but not limited to your name, email address,
            and profile picture. We may also access basic profile information
            from your Google account to enhance your gaming experience.
          </li>
          <li>
            GitHub OAuth: If you opt to log in or sign up using GitHub OAuth,
            Wordbuzz will collect and store your GitHub account information,
            such as your username and email address. We may request additional
            permissions to access public repositories or other GitHub features
            to provide you with relevant functionalities within the game.
          </li>
        </ul>
        <h3 className="text-3xl font-bold">How We Use Your Information</h3>
        <p>We use the information collected to:</p>
        <p>
          Authenticate your identity and provide you with secure access to
          Wordbuzz. Personalize your gaming experience by displaying your
          profile picture and username. Communicate important updates,
          notifications, and information related to Wordbuzz. Improve our game's
          features, functionality, and user interface.
        </p>
        <h3 className="text-3xl font-bold">Information Sharing</h3>
        <p>
          Information Sharing We do not sell, trade, or otherwise transfer your
          personally identifiable information to outside parties. However, we
          may share your information with third parties for specific purposes,
          such as analytics and game improvement, while ensuring that your
          privacy is protected.{" "}
        </p>
        <h3 className="text-3xl font-bold">Security</h3>
        <p>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, disclosure, alteration,
          and destruction. However, please be aware that no method of
          transmission over the internet or electronic storage is 100% secure.
        </p>
        <h3 className="text-3xl font-bold">Third-Party Services</h3>
        <p>
          Wordbuzz integrates Google and GitHub OAuth services. Please review
          the privacy policies of Google and GitHub for information on how they
          handle your data:
        </p>
        <p>
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="underline block"
          >
            Google Privacy & Terms
          </Link>
          <Link
            href="https://docs.github.com/en/github/site-policy/github-privacy-statement"
            target="_blank"
            className="underline"
          >
            GitHub Privacy Statement
          </Link>
        </p>
        <h3 className="text-3xl font-bold">Changes to This Privacy Policy</h3>
        <p>
          We reserve the right to update our Privacy Policy periodically. You
          will be notified of any changes on the Wordbuzz platform, and it is
          your responsibility to review this policy for any updates.{" "}
        </p>
        <h3 className="text-3xl font-bold">Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <Link href="mailto:arbrahimbadsa@gmail.com" className="underline">
            arbrahimbadsa@gmail.com
          </Link>
          . Thank you for choosing Wordbuzz! Enjoy the game responsibly.
        </p>
      </div>
    </div>
  );
}
