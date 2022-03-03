import { createElement } from "tsx-create-element";
import jsPdf from "jspdf";
export class TranscriptGenerator {
    constructor() {
    }
    generateTranscript() {
        const offset = 5;
        const transcriptFile = new jsPdf();
        const WIDTH = transcriptFile.internal.pageSize.width;
        const HEIGHT = transcriptFile.internal.pageSize.height;
        transcriptFile.setFontSize(10);
        transcriptFile.setLineWidth(1.2);
        const logoWidth = 25;
        const logoHeight = 30;
        transcriptFile.rect(offset, offset * 1.5, WIDTH - (offset + offset), HEIGHT - (offset * 3));
        transcriptFile.setLineWidth(0.5);
        transcriptFile.rect(offset + 3, (offset * 1.5) + 3, WIDTH - (offset + offset) - 6, HEIGHT - ((offset * 3) + 6));
        let img = createElement("img", { src: "../assets/uenr-logo-768x998.png" });
        transcriptFile.addImage(img, "jpeg", offset + 10, offset + 15, logoWidth, logoHeight);
        transcriptFile.setFontSize(14);
        transcriptFile.setTextColor("#058709");
        transcriptFile.text("UNIVERSITY OF ENERGY AND NATURAL RESOURCES", (offset + logoWidth + 22.5), offset + 20);
        transcriptFile.setTextColor("#000");
        transcriptFile.setFontSize(11);
        transcriptFile.text("Academic and Students Affair Division", (offset + logoWidth + 53), offset + 24);
        transcriptFile.setFontSize(9);
        transcriptFile.text("P.O Box 214, Sunyani-Ghana || Email: registrar@uenr.edu.gh", (offset + logoWidth + 45), offset + 28);
        //
        transcriptFile.setFontSize(14);
        transcriptFile.text("TRANSCRIPT OF ACADEMIC RECORD", (offset + logoWidth + 45), offset + 37);
        transcriptFile.setFillColor("#05870a");
        transcriptFile.rect(offset + 3, offset + logoHeight + 20, WIDTH - (offset + offset) - 6, 7, "F");
        //
        transcriptFile.setTextColor("#d0d0d0");
        transcriptFile.text("A BLACK AND WHITE DOCUMENT IS NOT OFFICIAL", (offset + logoWidth + 22.5), offset + logoHeight + 25);
        transcriptFile.setFillColor("#000");
        transcriptFile.setTextColor("#000");
        //
        transcriptFile.setFontSize(12);
        transcriptFile.text("Name:", offset + 10, offset + logoHeight + 32);
        transcriptFile.text("Gender: ", offset + 10, offset + logoHeight + 38);
        transcriptFile.text("FGPA: 5.5", offset + 10, offset + logoHeight + 45);
        transcriptFile.text("Program:", offset + 10, offset + logoHeight + 51);
        transcriptFile.text("Major:", offset + 10, offset + logoHeight + 57);
        //
        transcriptFile.text("Exams Number:", offset + 122, offset + logoHeight + 32);
        transcriptFile.text("Date of Birth(m/d/y):", offset + 122, offset + logoHeight + 38);
        transcriptFile.text("Total Credit:", offset + 122, offset + logoHeight + 45);
        transcriptFile.text("Date Issued(m/d/y):", offset + 122, offset + logoHeight + 51);
        transcriptFile.text("Class:", offset + 122, offset + logoHeight + 57);
        transcriptFile.rect(offset + 3, offset + logoHeight + 61, WIDTH - (offset + offset) - 6, 1, "F");
        transcriptFile.save("transcript.pdf");
    }
}
//# sourceMappingURL=transcriptGenerator.js.map