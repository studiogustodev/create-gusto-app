import { RECEIVE_OPTIONS } from '@/actions/types'

const initialState = {
  strings: {
    welcomeLine1: 'Trova il tuo nome nei titoli di coda<br /> speciali de La Casa di Carta',
    placeholderSearch: 'Trova il tuo nome',
    notFoundTitle: 'OPS!',
    notFoundMessage: 'Non abbiamo trovato il tuo nome. <br />Hai seguito il piano alla lettera?',
    skipLabel: 'Skip video',
    finalTitle1: 'Perfetto, /name/.',
    finalTitle2: 'Sembra che tu faccia parte della banda.',
    finalText1: 'Guarda il momento esatto in cui il tuo nome compare nei titoli di coda speciali de La Casa di Carta su Netflix* o scarica il video dedicato a te',
    finalDisclaimer: '*per poter visualizzare il video nei contenuti extra de La casa di Carta, connettiti a Netflix dall\'Italia',
    finalText2: `<strong>Di solito ti chiederemmo di mantenere il segreto.</strong><br>
    Ma per questa volta, faremo un'eccezione.`,
    shareMessage: 'Condividi con tutti il tuo ingresso nella banda.',
    ctaNetflix: 'Guarda il tuo nome su Netflix',
    ctaDownload: 'Scarica il tuo video',
    ctaDownloadSubmitted: 'Video scaricato',
    ctaDownloadInApp: 'Genera il tuo video',
    loadingDownload: 'Stiamo elaborando il video...',
    loadingFailed: 'Si è verificato un errore...',
    ctaRestart: 'Ricomincia l\'esperienza',
    restartLine1: 'Vuoi ricominciare',
    restartLine2: 'l\'esperienza?',
    restartCtaReject: 'Resta qui',
    restartCtaAccept: 'Ricomincia',
    fingerprintDx: 'Fingerprints<br />Middle finger dx',
    fingerprintSx: 'Fingerprints<br />Middle finger sx',
    alias: 'Alias:',
    skills: 'Specializzazione:',
    cities: ['Jakarta', 'Seoul', 'Guangzhou', 'Istanbul', 'Londra', 'Santiago', 'Milano', 'Firenze', 'Roma', 'Torino', 'Porto', 'Lima', 'Toronto', 'Atlanta', 'Atene', 'Sidney', 'Medellin', 'Dakar', 'Aleppo', 'Tampa', 'Medan', 'Havana', 'Cali', 'Vancouver', 'Bonn', 'Giza', 'Amburgo', 'Monaco', 'Zurigo', 'Belgrado', 'Mogadiscio', 'Zante', 'Sofia', 'Rosario', 'Marrakech', 'Cairo', 'Bruges', 'Venezia', 'Odessa', 'Stoccarda', 'Dublino', 'Edimburgo', 'Glasgow', 'Miami', 'Detroit', 'Praga', 'Salem', 'Gerusalemme', 'Columbus', 'Riga'],
    roles: ['Furto con scasso', 'Esplosivi e demolizione', 'Incursioni e assalto frontale', 'Infiltrazione e pirateria informatica', 'Autista', 'Palo', 'Aggancio in polizia', 'Pianificazione'],
    characterDescription: [
      '<span>Autore di numerosi furti con scasso presso negozi di lusso e ville private. Il ricercato sembra prediligere colpi a</span> casseforti di ultima generazione, <span>probabilmente in segno di provocazione verso gli investigatori. Possiede</span> esperienza con ogni serratura, <span>per potenziare le sue abilità tecniche di scassinatore ha lavorato come</span> apprendista di un orologiaio. <span>Mai stato arrestato.</span>',
      '<span>Mina vagante esperta nella creazione di</span> esplosivi al plastico <span>e composti chimici infiammabili. L\'addestramento rigido seguito in</span> esercito <span>e diverse missioni in zone di guerra lo rendono un profilo altamente insidioso. Scarsa attitudine alla collaborazione in team. È un pericoloso</span> piromane <span>che segue solamente il suo impulso incendiario.</span>',
      '<span>Una vera e propria macchina da guerra umana, addestrata nell\'utilizzo di un ampio arsenale di</span> armi automatiche e semiautomatiche. <span>Dopo aver fatto parte per anni delle</span> forze speciali, <span>il ricercato ha impiegato la sua conoscenza balistica e le</span> tecniche di sfondamento <span>apprese durante la formazione militare per numerosi assalti a banche e blindati.</span>',
      '<span>Totalmente</span> invisibile. <span>La sua estrema capacità nel reinventare la propria persona lo rende un profilo apparentemente impossibile da rintracciare. Sfrutta</span> numerosi alias <span>che compaiono e scompaiono sotto la lente di ingrandimento degli investigatori. Ha lavorato nei</span> reparti d\'élite, <span>poi improvvisamente abbandonati senza fornire giustificazioni.</span>',
      'Ex pilota di corse clandestine. <span>La prontezza di riflessi, l\'abilità al volante e la totale assenza di paura ne fanno un ricercato difficile da agganciare durante gli inseguimenti. Sfida gli investigatori guidando</span> macchine di grossa cilindrata <span>con colori accesi. La sua esperienza gli consente di trovarsi preparato a</span> ogni condizione atmosferica.',
      '<span>Già noto agli inquirenti</span> per piccoli furti <span>e reati minori. Ha una grande rete di contatti e fonti di fiducia che utilizza abilmente per ottenere informazioni. Bazzica nei bassifondi dove compra indizi e notizie con esigue somme di denaro. Svolge il ruolo di tramite fra diverse fazioni della criminalità organizzata e fa da</span> collegamento con la malavita.',
      'Gli Affari Interni indagano <span>su di lui da anni. Il suo</span> tenore di vita elevato <span>tradisce ingressi economici non dichiarati e illeciti. Sembrerebbe aver ricevuto mazzette cospicue in cambio di informazioni che hanno impedito alle forze dell\'ordine di cogliere criminali in flagrante. Nel suo storico è presente un</span> partner morto in circostanze misteriose.',
      '<span>È il burattinaio che muove i fili dell\'operazione. La sua</span> identità reale è sconosciuta. <span>È riuscito a rimanere nel totale anonimato lavorando</span> dietro le quinte <span>nonostante l\'organizzazione di colpi complessi con grandi numeri di persone coinvolte. Mantiene il suo profilo</span> invisibile <span>anche ai suoi collaboratori stretti, che non lo hanno mai visto in faccia.</span>',
    ],
    restartTitle: 'Vuoi ricominciare<br />l\'esperienza?',
    restartCta1: 'Resta qui',
    restartCta2: 'Ricomincia',
    shareTitle: 'Guarda il momento esatto in cui il tuo nome compare nei titoli di coda speciali de La Casa di Carta su Netflix*',
    shareText: 'Oppure copia il link negli appunti e avvia il video quando vuoi.',
    shareTextAlt: 'Copia il link negli appunti e avvia il video quando vuoi.',
    shareDisclaimer: '*per poter visualizzare il video nei contenuti extra de La casa di Carta, connettiti a Netflix dall\'Italia',
    shareCta1: 'Trova il tuo nome',
    shareCta2: 'Copia',
    copied: 'Copiato negli appunti',
    netflixURL: 'https://www.netflix.com/watch/81565803?t=',
    inAppTitle: 'Copia questo indirizzo e incollalo nel tuo browser per visualizzare il tributo ai fan de La Casa di Carta*',
    inAppText: '*per scaricare il video sul dispositivo assicurati di copiare il link su Safari o Chrome',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_OPTIONS:
      state = {
        ...state,
        strings: action.payload,
      }
      break
    default:
      return { ...state }
  }
  return { ...state }
}
