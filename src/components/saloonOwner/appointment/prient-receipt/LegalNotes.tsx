export default function LegalNotes() {
  return (
    <>
      <section className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
        <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
          Legal Notes
        </h2>
        <ul className="space-y-2.5">
          {[
            "Invoice issued pursuant to art. 21 of Presidential Decree 26 October 1972, n. 633 and subsequent amendments.",
            "VAT paid by the purchaser pursuant to art. 17, paragraph 6, of Presidential Decree 26 October 1972, n. 633.",
            "Digitally signed electronic document pursuant to Legislative Decree 82/2005.",
            "Replacement storage of documents pursuant to the Ministerial Decree of 17 June 2014.",
            "Competent court: Milan. Applicable law: Italian.",
            "Company subject to the management and coordination of [Holding Company].",
          ].map((note, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-sm font-manrope text-[#526B7A] leading-relaxed">
                â€¢ {note}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
