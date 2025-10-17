import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateResumePDF = async () => {
  try {
    // Elements to include in the PDF
    const sections = [
      { id: 'about', title: 'About' },
      { id: 'skills', title: 'Skills' },
      { id: 'experience', title: 'Experience' },
      { id: 'education', title: 'Education' },
      { id: 'portfolio', title: 'Portfolio' }
    ];

    const pdf = new jsPDF('p', 'mm', 'a4');
    let yPos = 10;
    let firstPage = true;

    // Add each section to the PDF
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      // If not the first page, add a new page
      if (!firstPage) {
        pdf.addPage();
        yPos = 10;
      }

      // Add section title
      pdf.setFontSize(16);
      pdf.setTextColor(0, 255, 157); // pixel-green color
      pdf.text(section.title, 10, yPos);
      yPos += 10;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#121212', // modern-dark color
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          // Remove any fixed position elements from the clone
          const fixedElements = clonedDoc.querySelectorAll('.fixed');
          fixedElements.forEach(el => el.remove());
        }
      });

      const imgWidth = 190;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 10, yPos, imgWidth, imgHeight);
      yPos += imgHeight + 10;

      firstPage = false;
    }

    // Save the PDF
    pdf.save('tehilla-obanor-cv.pdf');
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};