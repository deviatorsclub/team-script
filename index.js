const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const teamData = JSON.parse(fs.readFileSync("team.json", "utf8"));

const lettersDir = path.join(__dirname, "letters");
if (!fs.existsSync(lettersDir)) {
  fs.mkdirSync(lettersDir);
} else {
  fs.rmSync(lettersDir, { recursive: true });
  fs.mkdirSync(lettersDir);
}

function generatePDF(member) {
  const doc = new jsPDF();

  const logoPath = path.join(__dirname, "logo.png");
  doc.addImage(fs.readFileSync(logoPath), "PNG", 10, 10, 20, 20);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.setFont("helvetica", "bold");
  doc.text(member.name.toUpperCase(), 10, 40);
  doc.setFont("helvetica", "normal");
  doc.text("Dronacharya College of Engineering", 10, 45);
  doc.text("Gurugram, Haryana, 123506", 10, 50);

  const pageWidth = doc.internal.pageSize.getWidth() - 20;
  doc.text("August 14th, 2024", pageWidth - 10, 40, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.text("Subject: Appointment letter for Deviators Club.", 10, 60);

  doc.setFont("helvetica", "normal");
  doc.text("Greetings!", 10, 70);

  doc.text(
    "We are pleased to inform you that you have been selected and we are excited to offer you",
    10,
    80
  );
  doc.text("the opportunity to contribute to Deviators Club.", 10, 85);

  doc.text("Your roles are:", 10, 95);
  let yPos = 105;
  member.roles.forEach((role) => {
    doc.text(`• ${role}`, 20, yPos);
    yPos += 5;
  });

  doc.text(
    `Your appointment is effective from ${member.joiningDate}. We appreciate your willingness to con-`,
    10,
    yPos + 10
  );
  doc.text(
    "tribute your time, energy, and skills to support the initiatives and activities of our club.",
    10,
    yPos + 15
  );

  doc.text(
    "You will be working closely with our team to ensure the success of the tasks assigned to you.",
    10,
    yPos + 25
  );
  doc.text(
    `You'll have to work for ${member.monthsPeriod} months, and you can't leave before the termination date; failing to`,
    10,
    yPos + 30
  );
  doc.text(
    "do so won't grant you any certificates or benefits.",
    10,
    yPos + 35
  );

  doc.text(
    "Kindly confirm your acceptance of this offer by replying to this email with your digital",
    10,
    yPos + 45
  );
  doc.text(
    "signature by EOD. Should you have any questions or need further clarification on your",
    10,
    yPos + 50
  );
  doc.text(
    "role, please do not hesitate to contact us at clubdeviators@gmail.com.",
    10,
    yPos + 55
  );

  doc.text(
    "We look forward to your positive response and are excited to work with you.",
    10,
    yPos + 65
  );

  doc.text("Sincerely,", 10, yPos + 75);

  const signaturePath = path.join(__dirname, "leader_sign.jpeg");
  doc.addImage(fs.readFileSync(signaturePath), "JPEG", 10, yPos + 85, 30, 15);

  doc.text("KANAK TANWAR", 10, yPos + 105);
  doc.text("Co-founder (Deviators)", 10, yPos + 110);
  doc.text(member.name.toUpperCase(), 140, yPos + 105);
  doc.text("(Proof of Acceptance of T&C)", 140, yPos + 110);

  const fileName = `${member.name.replace(/\s+/g, "_")}.pdf`;
  doc.save(path.join(lettersDir, fileName));
}

teamData.forEach(generatePDF);

console.log(`Generated ${teamData.length} PDFs in the /letters directory.`);
