from fpdf import FPDF
import io

class PDF(FPDF):
    def header(self):
        self.set_font("helvetica", "B", 15)
        self.cell(0, 10, "Travel Assistance Final Plan", ln=True, align="C")
        self.ln(5)

    def chapter_title(self, title):
        self.set_font("helvetica", "B", 12)
        self.cell(0, 10, title, ln=True, align="L")
        self.ln(2)

    def chapter_body(self, body):
        self.set_font("helvetica", "", 10)
        # fpdf2 handles multi_cell reasonably well
        self.multi_cell(0, 6, body.encode('latin-1', 'replace').decode('latin-1'))
        self.ln(5)

def generate_pdf_bytes(session_data: dict) -> bytes:
    pdf = PDF()
    pdf.add_page()

    sections = [
        ("Destination Context", f"Destination: {session_data.get('input', {}).get('destination', 'N/A')}\nDates: {session_data.get('input', {}).get('dates', 'N/A')}\nBudget: {session_data.get('input', {}).get('budget', 'N/A')}"),
        ("1. Planner Itinerary", session_data.get("planner", "Not generated yet.")),
        ("2. Budget Breakdown", session_data.get("budget", "Not generated yet.")),
        ("3. Hotel Options", session_data.get("hotel", "Not generated yet.")),
        ("4. Transport Plan", session_data.get("transport", "Not generated yet.")),
        ("5. Travel Guide & Tips", session_data.get("guide", "Not generated yet."))
    ]

    for title, body in sections:
        pdf.chapter_title(title)
        pdf.chapter_body(body)

    return pdf.output(dest="S")
