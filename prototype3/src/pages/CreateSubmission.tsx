import { Header } from "../components/Header";
import { SidebarSubmission } from "../components/SidebarSubmission";
import { NewSubmissionTopBar } from "../components/NewSubmissionTopBar";

export const CreateSubmission = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <main className="flex-grow bg-gray-200 p-8">
          <section className="flex flex-col items-start max-w-7xl m-auto space-y-8">
            <NewSubmissionTopBar />
            <div className="bg-white rounded-md flex flex-col gap-4 w-full p-8">
              <p className="text-2xl font-bold">Lorem ipsum dolor</p>
              <div className="flex flex-col gap-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sin
                  kakan malitiam dixisses, ad aliud nos unum certum vitium
                  consuetudo Latina traduceret. Cum salvum esse flentes sui
                  respondissent, rogavit essentne fusi hostes. Quid de Platone
                  aut de Democrito loquar? Cave putes quicquam esse verius. Sed
                  ad haec, nisi molestum est, habeo quae velim. Duo Reges:
                  constructio interrete.
                </p>

                <p>
                  Beatus autem esse in maximarum rerum timore nemo potest. Huius
                  ego nunc auctoritatem sequens idem faciam. Nam neque virtute
                  retinetur ille in vita, nec iis, qui sine virtute sunt, mors
                  est oppetenda. Sin aliud quid voles, postea. Non dolere,
                  inquam, istud quam vim habeat postea videro; Portenta haec
                  esse dicit, neque ea ratione ullo modo posse vivi;
                </p>

                <p>
                  Stoici autem, quod finem bonorum in una virtute ponunt,
                  similes sunt illorum; Quid iudicant sensus? Atqui eorum nihil
                  est eius generis, ut sit in fine atque extrerno bonorum.
                  Graecum enim hunc versum nostis omnes-: Suavis laborum est
                  praeteritorum memoria. Non autem hoc: igitur ne illud quidem.
                  Quid enim tanto opus est instrumento in optimis artibus
                  comparandis? Istam voluptatem perpetuam quis potest praestare
                  sapienti? Addo etiam illud, multa iam mihi dare signa puerum
                  et pudoris et ingenii, sed aetatem vides.
                </p>

                <p>
                  Aliter enim explicari, quod quaeritur, non potest. Quare,
                  quoniam de primis naturae commodis satis dietum est nunc de
                  maioribus consequentibusque videamus. Quod si ita sit, cur
                  opera philosophiae sit danda nescio. Oratio me istius
                  philosophi non offendit; Placet igitur tibi, Cato, cum res
                  sumpseris non concessas, ex illis efficere, quod velis? Res
                  enim se praeclare habebat, et quidem in utraque parte. Roges
                  enim Aristonem, bonane ei videantur haec: vacuitas doloris,
                  divitiae, valitudo; Satis est tibi in te, satis in legibus,
                  satis in mediocribus amicitiis praesidii.
                </p>

                <p>
                  Hoc etsi multimodis reprehendi potest, tamen accipio, quod
                  dant. Ego quoque, inquit, didicerim libentius si quid
                  attuleris, quam te reprehenderim. Satis est tibi in te, satis
                  in legibus, satis in mediocribus amicitiis praesidii. Nobis
                  aliter videtur, recte secusne, postea; Familiares nostros,
                  credo, Sironem dicis et Philodemum, cum optimos viros, tum
                  homines doctissimos. Quid, si etiam iucunda memoria est
                  praeteritorum malorum? Primum in nostrane potestate est, quid
                  meminerimus? Quid ergo aliud intellegetur nisi uti ne quae
                  pars naturae neglegatur?
                </p>

                <p>
                  Haec dicuntur inconstantissime. Quae contraria sunt his,
                  malane? In eo enim positum est id, quod dicimus esse
                  expetendum. Quid igitur dubitamus in tota eius natura quaerere
                  quid sit effectum? Tum, Quintus et Pomponius cum idem se velle
                  dixissent, Piso exorsus est. Negabat igitur ullam esse artem,
                  quae ipsa a se proficisceretur; Quid enim me prohiberet
                  Epicureum esse, si probarem, quae ille diceret? Praeclare hoc
                  quidem.
                </p>

                <p>
                  Rationis enim perfectio est virtus; Tum mihi Piso: Quid ergo?
                  Nec enim, omnes avaritias si aeque avaritias esse dixerimus,
                  sequetur ut etiam aequas esse dicamus. Piso, familiaris
                  noster, et alia multa et hoc loco Stoicos irridebat: Quid
                  enim?
                </p>
              </div>
            </div>
          </section>
        </main>
        <SidebarSubmission />
      </div>
    </div>
  );
};
