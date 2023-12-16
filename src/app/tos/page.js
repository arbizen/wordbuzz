import Link from "next/link";

export default function Tos() {
  return (
    <div class="bg-[#101619] text-slate-50 h-screen w-screen p-[32px] md:p-[52px] overflow-y-scroll">
      <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold mb-6">Terms of Service</h1>

        <p class="mb-4">Last Updated: 16/12/2023</p>

        <p class="mb-6">
          Thank you for choosing Wordbuzz! By using our game, you agree to
          comply with and be bound by the following terms and conditions. Please
          read these terms carefully before using Wordbuzz.
        </p>

        <h2 class="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p class="mb-4">
          By accessing or using Wordbuzz, you agree to be bound by these Terms
          of Service. If you do not agree with any part of these terms, you may
          not use our game.
        </p>

        <h2 class="text-2xl font-bold mb-4">2. User Accounts</h2>
        <p class="mb-4">
          To access certain features of Wordbuzz, you may be required to create
          a user account. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.
        </p>

        <h2 class="text-2xl font-bold mb-4">3. Privacy Policy</h2>
        <p class="mb-4">
          Your use of Wordbuzz is also governed by our Privacy Policy. Please
          review the Privacy Policy carefully to understand how we collect, use,
          and protect your personal information.
        </p>

        <h2 class="text-2xl font-bold mb-4">4. Intellectual Property</h2>
        <p class="mb-4">
          Wordbuzz and its original content, features, and functionality are
          owned by{" "}
          <Link
            className="underline"
            href="https://x.com/arbizzen"
            target="_blank"
          >
            @arbizzen
          </Link>{" "}
          and are protected by international copyright, trademark, patent, trade
          secret, and other intellectual property or proprietary rights laws.
        </p>

        <h2 class="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
        <p class="mb-4">
          In no event shall Wordbuzz or its owners be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss
          of profits or revenues, whether incurred directly or indirectly.
        </p>

        <h2 class="text-2xl font-bold mb-4">6. Governing Law</h2>
        <p class="mb-4">
          These Terms of Service shall be governed by and construed in
          accordance with the laws of Bangladesh, without regard to its conflict
          of law principles.
        </p>

        <p class="mt-8">
          For any questions or concerns regarding these Terms of Service, please
          contact us at{" "}
          <Link href="mailto:arbrahimbadsa@gmail.com" className="underline">
            arbrahimbadsa@gmail.com
          </Link>
        </p>

        <p class="mt-8">
          Thank you for choosing Wordbuzz! Enjoy the game responsibly.
        </p>
      </div>
    </div>
  );
}
