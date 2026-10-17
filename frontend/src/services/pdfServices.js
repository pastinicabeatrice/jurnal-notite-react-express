import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const pdfService = {
  generatePDF: async (entry) => {
    const pdf = new jsPDF('p', 'mm', 'a4')

    pdf.setFontSize(16)
    pdf.text(entry.title, 20, 20)

    pdf.setFontSize(10)
    const createdAt = new Date(entry.createdAt).toLocaleString('ro-RO')
    pdf.text(`data creării: ${createdAt}`, 20, 30)

    pdf.setFontSize(12)
    const contentLines = pdf.splitTextToSize(entry.content, 170)
    pdf.text(contentLines, 20, 40)

    pdf.save(`jurnal_${entry.id}_${new Date().getTime()}.pdf`)
  },

  exportToHTML: async (entry) => {
    const htmlContent = `
      <html>
        <head>
          <title>${entry.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .title { font-size: 24px; margin-bottom: 20px; }
            .metadata { font-size: 12px; color: #666; }
            .content { margin-top: 20px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="title">${entry.title}</div> <!-- titlul intrarii -->
          <div class="metadata">
            creat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')} <!-- data crearii -->
          </div>
          <div class="content">${entry.content}</div> <!-- continutul intrarii -->
        </body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: 'text/html' })
    return blob
  }
}

export default pdfService
