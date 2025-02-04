<x-mail::message>
    # Introduction
    ## hello {{ $user->name }}
    We’re excited to welcome you to Boost Manifesto University. Before you begin your journey, we need to verify your
    account. Follow these steps to complete the verification process:

    Click the link below to verify your account:


    <x-mail::button :url="$url">
        Verify Your Email
    </x-mail::button>
    After verification, you’ll have access to all the amazing features on Boost Manifesto University.
    If you encounter any issues or have questions, our support team is here to help. Simply reply to this email or reach
    out to us at example@gmail.com .


    Welcome aboard!,<br>
    Sincerely,<br>
    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
