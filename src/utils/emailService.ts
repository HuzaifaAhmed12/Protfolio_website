// Email service utility for contact form
export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// EmailJS configuration
export const emailConfig = {
  serviceId: 'service_portfolio', // Replace with your EmailJS service ID
  templateId: 'template_contact', // Replace with your EmailJS template ID
  userId: 'your_emailjs_user_id', // Replace with your EmailJS user ID
};

// Send email using EmailJS
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: emailConfig.serviceId,
        template_id: emailConfig.templateId,
        user_id: emailConfig.userId,
        template_params: {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: 'huzaifaahmed0605@gmail.com', // Your email
          reply_to: data.email
        }
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Fallback email function using mailto
export const sendEmailFallback = (data: EmailData): void => {
  const mailtoLink = `mailto:huzaifaahmed0605@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
  )}`;
  window.location.href = mailtoLink;
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate form data
export const validateFormData = (data: EmailData): string[] => {
  const errors: string[] = [];
  
  if (!data.name.trim()) {
    errors.push('Name is required');
  }
  
  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.subject.trim()) {
    errors.push('Subject is required');
  }
  
  if (!data.message.trim()) {
    errors.push('Message is required');
  }
  
  return errors;
};