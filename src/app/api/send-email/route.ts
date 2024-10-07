import { NextRequest, NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export async function POST(request: NextRequest) {
  try {
    const voletState = await request.json(); // Expect the Redux state

    // Ensure required fields are available
    if (!voletState.email) {
      return NextResponse.json({ message: 'Email requis' }, { status: 400 });
    }

    // Set up Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create the HTML table for the email body using voletState
    const htmlContent = `
      <h2>Demande de devis pour volet roulant</h2>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        ${voletState.fullNameOrCompany ? `
          <tr>
            <th>Nom ou Société</th>
            <td>${voletState.fullNameOrCompany}</td>
          </tr>` : ''}

        ${voletState.email ? `
          <tr>
            <th>Email</th>
            <td>${voletState.email}</td>
          </tr>` : ''}

        ${voletState.phoneNumber ? `
          <tr>
            <th>Numéro de téléphone</th>
            <td>${voletState.phoneNumber}</td>
          </tr>` : ''}

        ${voletState.deliveryOption ? `
          <tr>
            <th>Option de livraison</th>
            <td>${voletState.deliveryOption}</td>
          </tr>` : ''}

        ${voletState.deliveryAddress ? `
          <tr>
            <th>Adresse de livraison</th>
            <td>${voletState.deliveryAddress}</td>
          </tr>` : ''}

        ${voletState.postalCode ? `
          <tr>
            <th>Code postal</th>
            <td>${voletState.postalCode}</td>
          </tr>` : ''}

        ${voletState.city ? `
          <tr>
            <th>Ville</th>
            <td>${voletState.city}</td>
          </tr>` : ''}

        ${voletState.lameSelected ? `
          <tr>
            <th>Lame sélectionnée</th>
            <td>${voletState.lameSelected}</td>
          </tr>` : ''}

        ${voletState.dimensions?.Largeur && voletState.dimensions?.Hauteur ? `
          <tr>
            <th>Dimensions (Largeur x Hauteur)</th>
            <td>${voletState.dimensions.Largeur} x ${voletState.dimensions.Hauteur}</td>
          </tr>` : ''}

        ${voletState.selectedColor?.coulisse || voletState.selectedColor?.tablier || voletState.selectedColor?.lameFinale ? `
          <tr>
            <th>Couleurs sélectionnées</th>
            <td>Coulisse: ${voletState.selectedColor.coulisse || 'N/A'}, 
            Tablier: ${voletState.selectedColor.tablier || 'N/A'}, 
            Lame finale: ${voletState.selectedColor.lameFinale || 'N/A'}</td>
          </tr>` : ''}

        ${voletState.poseInstalled ? `
          <tr>
            <th>Pose installée</th>
            <td>${voletState.poseInstalled}</td>
          </tr>` : ''}

        ${voletState.manoeuvreSelected ? `
          <tr>
            <th>Manœuvre sélectionnée</th>
            <td>${voletState.manoeuvreSelected}</td>
          </tr>` : ''}

        ${voletState.commandeManualSelected ? `
          <tr>
            <th>Commande manuelle sélectionnée</th>
            <td>${voletState.commandeManualSelected}</td>
          </tr>` : ''}

        ${voletState.optionMotorisationSelected ? `
          <tr>
            <th>Option motorisation sélectionnée</th>
            <td>${voletState.optionMotorisationSelected}</td>
          </tr>` : ''}

        ${voletState.optionTelecomandeSelected ? `
          <tr>
            <th>Option télécommande sélectionnée</th>
            <td>${voletState.optionTelecomandeSelected}</td>
          </tr>` : ''}

        ${voletState.optionInterrupteurSelected ? `
          <tr>
            <th>Option interrupteur sélectionnée</th>
            <td>${voletState.optionInterrupteurSelected}</td>
          </tr>` : ''}

        ${voletState.sortieDeCableSelected ? `
          <tr>
            <th>Sortie de câble sélectionnée</th>
            <td>${voletState.sortieDeCableSelected}</td>
          </tr>` : ''}

        ${voletState.multiplier ? `
          <tr>
            <th>Multiplicateur</th>
            <td>${voletState.multiplier}</td>
          </tr>` : ''}
      </table>
    `;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${voletState.email}, ${process.env.EMAIL_USER}`, // Send to both the user's email and your own email
      subject: 'Demande de devis pour volet roulant',
      html: htmlContent,  // Use the HTML content for the email
    };

    // Try sending the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email envoyé avec succès !' }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    return NextResponse.json({ message: 'Échec de l\'envoi de l\'email', error: error.message }, { status: 500 });
  }
}
