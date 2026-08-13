export default function Transfer() {
  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-[#EFF4FA] p-[30px]">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
            Transferor/Provider
          </h2>
          <p className="text-[18px] font-bold font-manrope text-[#29343D] mb-2">
            Bella Vista Salon
          </p>
          <p className="text-sm font-manrope text-[#526B7A] mb-2">
            Via Roma, 123
          </p>
          <p className="text-sm font-manrope text-[#526B7A] mb-5">
            20121 Milan (MI) - Italy
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-xs font-manrope text-[#999]">PIVA</p>
              <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                IT12345678901
              </p>
            </div>
            <div>
              <p className="text-xs font-manrope text-[#999]">Tax Code</p>
              <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                12345678901
              </p>
            </div>
            <div>
              <p className="text-xs font-manrope text-[#999] ">PEC</p>
              <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                amministrazione@pec.salonflow.it
              </p>
            </div>
            <div>
              <p className="text-xs font-manrope text-[#999]">Recipient Code</p>
              <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                XXXXXXX
              </p>
            </div>
            <div>
              <p className="text-xs font-manrope text-[#999]">Telephone</p>
              <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                +39 02 1234567
              </p>
            </div>
            <div>
              <p className="text-xs font-manrope text-[#999]">Email</p>
              <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                fatturazione@salonflow.it
              </p>
            </div>
          </div>
        </div>

        {/* Transferee/Client */}
        <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
          <h2 className="text-xl font-bold font-manrope text-[#29343D] mb-7">
            Transferee/Client
          </h2>
          <p className="text-[18px] font-bold font-manrope text-[#29343D] mb-2">
            Maria Rodriguez
          </p>
          <p className="text-sm font-manrope text-[#526B7A] mb-2">
            Via Esempio, 456
          </p>
          <p className="text-sm font-manrope text-[#526B7A] mb-4">
            10100 Turin (TO) - Italy
          </p>

          <div>
            <p className="text-xs font-manrope text-[#999]">Tax Code</p>
            <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
              98765432109
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
