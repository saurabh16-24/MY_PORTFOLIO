import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    
    const { name, email, subject, message } = await request.json()
    console.log('Form data received:', { name, email, subject, message })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: missing fields')
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Validation failed: invalid email format')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    console.log('Attempting to send email via EmailJS...')
    
    // Send email using EmailJS
    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_h4cdbjc',
        template_id: 'template_sng6qol',
        user_id: 'bWD_MtP07mtTCW2RK',
        template_params: {
          name: name,
          email: email,
          subject: subject,
          message: message,
          from_name: name,
          from_email: email,
        }
      })
    })

    if (!emailjsResponse.ok) {
      const errorData = await emailjsResponse.text()
      console.error('EmailJS error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    console.log('Email sent successfully via EmailJS')
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
