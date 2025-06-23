// File: lib/generatePDF.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`generatePDF: elemento com id "${elementId}" não encontrado.`);
        return;
    }


    element.classList.add("force-solid-text");


    await new Promise((resolve) => setTimeout(resolve, 50));


    const originalOverflow = element.style.overflow;
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;


    const totalWidth = element.scrollWidth;
    const totalHeight = element.scrollHeight;


    element.style.width = totalWidth + "px";
    element.style.height = totalHeight + "px";
    element.style.overflow = "visible";

    const prevScrollX = window.scrollX;
    const prevScrollY = window.scrollY;
    window.scrollTo(0, 0);


    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        width: totalWidth,
        height: totalHeight,
        foreignObjectRendering: true,  // para tentar respeitar CSS avançado
    });

    // 6) Restaura scroll e estilos originais
    window.scrollTo(prevScrollX, prevScrollY);
    element.style.overflow = originalOverflow;
    element.style.width = originalWidth;
    element.style.height = originalHeight;

    // 7) Remove a classe de fallback
    element.classList.remove("force-solid-text");

    // 8) Gera o PDF a partir do canvas capturado
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
        unit: "px",
        format: "a4",
        compress: true,
    });

    // Ajusta proporção para caber a largura do A4
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

    // 9) Salva com nome contendo timestamp
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
    const filename = `Relatorio_MenteSegura_${timestamp}.pdf`;
    pdf.save(filename);
};
