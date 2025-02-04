<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\URL;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    //use class variables
    protected $user, $url;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
        $generate=URL::temporarySignedRoute('verify-email', now()->addMinutes(30), ['email'=>$user->email]);
        $app_url=config('app.url').':8000'.'/api/v1';
        // $app_url=config('app.url').'/api/v1';
        $this->url=str_replace($app_url, config('app.frontend_url'), $generate);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Email Verification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.email-verification.email_verification',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
    public function build()
    {
        return $this->from('example@gmail.com')->markdown('email-verification.email_verification', ['user'=>$this->user, 'url'=>$this->url]);
    }
}
