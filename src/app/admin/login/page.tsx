import Image from "next/image";
import { AdminLoginForm } from "../../../components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden

        px-5
        py-10

        bg-[#fffdf6]

        dark:bg-[#041522]
      "
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(135deg,#fffdf4_0%,#fff8d8_22%,#f4fbff_58%,#e1f3ff_100%)]

          dark:bg-[radial-gradient(circle_at_top_right,#0B3550_0%,#061B2A_40%,#041522_78%)]
        "
      />

      {/* YELLOW GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[170px]
          -top-[170px]

          h-[430px]
          w-[430px]

          rounded-full

          bg-[#FFD54F]/20

          blur-[130px]

          dark:bg-[#FFD54F]/[0.04]
        "
      />

      {/* BLUE GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[180px]
          -right-[150px]

          h-[460px]
          w-[460px]

          rounded-full

          bg-[#42A5F5]/20

          blur-[140px]

          dark:bg-[#2196F3]/10
        "
      />

      <div
        className="
          relative
          z-10

          w-full
          max-w-[460px]

          rounded-[30px]

          border
          border-white/70

          bg-white/65

          p-6

          shadow-[0_30px_80px_rgba(15,23,42,0.10)]

          backdrop-blur-2xl

          sm:p-9

          dark:border-white/[0.08]
          dark:bg-[#0B2031]/75
          dark:shadow-[0_35px_90px_rgba(0,0,0,0.35)]
        "
      >
        {/* LOGO */}

        <div className="mb-8 flex justify-center">
          <Image
            src="/Wispers-of-Wisdom-logo.png"
            alt="Whispers of Wisdom"
            width={220}
            height={100}
            priority
            className="
              h-auto
              w-[175px]
              object-contain

              dark:hidden
            "
          />

          <Image
            src="/logo-dark-1.png"
            alt="Whispers of Wisdom"
            width={220}
            height={100}
            priority
            className="
              hidden
              h-auto
              w-[175px]
              object-contain

              dark:block
            "
          />
        </div>

        <div className="mb-8 text-center">
          <h1
            className="
              font-serif
              text-[32px]
              font-medium
              tracking-[-0.03em]

              text-[#0F172A]

              dark:text-white
            "
          >
            Admin Portal
          </h1>

          <div
            className="
              mx-auto
              mt-4

              h-[2px]
              w-12

              rounded-full

              bg-gradient-to-r
              from-[#2196F3]
              to-[#FFD54F]
            "
          />
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}