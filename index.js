const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const fifa2014 = fifaData.filter((match) => {
  return match.Year === 2014 && match.Stage === "Final";
});

// console.log(fifa2014[0]["Home Team Name"]);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
//console.log(final2014[0]['Away Team Name']);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
//console.log(final2014[0]['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
//console.log(final2014[0]['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
let winner = fifa2014[0]["Home Team Goals"];
if (winner > fifa2014[0]["Away Team Goals"]) {
  // console.log(fifa2014[0]['Home Team Name'])
} else {
  // console.log(fifa2014[0]['Away Team Name'])
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dizi) {
  return dizi.filter((match) => {
    return match.Stage == "Final";
  });
}
// console.log(Finaller(fifaData));
/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(dizi, cb_Finaller) {
  let yil = [];
  yil = cb_Finaller(dizi).map((yil) => {
    return yil["Year"];
  });
  return yil;
}

// console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(dizi, cb_Finaller) {
  let kazananlar = cb_Finaller(dizi).map((yil) => {
    if (yil["Home Team Goals"] > yil["Away Team Goals"])
      return yil["Home Team Name"];
    else return yil["Away Team Name"];
  });
  return kazananlar;
}
//console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(dizi, cb_Finaller, cb_Yillar, cb_Kazananlar) {
  let cumle = cb_Kazananlar(dizi, cb_Finaller).map((kazanan, index) => {
    return `${
      cb_Yillar(dizi, cb_Finaller)[index]
    } yılında, ${kazanan} dünya kupasını kazandı!`;
  });
  return cumle;
}
// console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(cb_Finaller) {
  let toplamGol = cb_Finaller.reduce((toplam, mac) => {
    toplam += mac["Home Team Goals"] + mac["Away Team Goals"];
    return toplam;
  }, 0);
  // console.log(toplamGol);
  return (toplamGol / cb_Finaller.length).toFixed(2);
}
// console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data) {
  let finaller = data.filter((mac) => mac.Stage == "Final");
  let kisaltma = finaller.reduce((acc, item) => {
    let homeTeam = item["Home Team Initials"];
    let homeTeamGoals = item["Home Team Goals"];
    let awayTeamGoals = item["Away Team Goals"];
    if (homeTeamGoals > awayTeamGoals) {
      if (acc[homeTeam] == undefined) {
        acc[homeTeam] = 1;
      } else {
        acc[homeTeam]++;
      }
    } else {
      let awayTeam = item["Away Team Initials"];

      if (acc[awayTeam] == undefined) {
        acc[awayTeam] = 1;
      } else {
        acc[awayTeam]++;
      }
    }
    return acc;
  }, {});

  console.log(kisaltma);
}
UlkelerinKazanmaSayilari(fifaData);

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
  let finaller = data.filter((mac) => mac.Stage == "Final");
  let goals = finaller.reduce((acc, item) => {
    let homeTeam = item["Home Team Initials"];
    if (acc[homeTeam] == undefined) {
      acc[homeTeam] = item["Home Team Goals"];
    } else {
      acc[homeTeam] += item["Home Team Goals"];
    }
    let awayTeam = item["Away Team Initials"];
    if (acc[awayTeam] == undefined) {
      acc[awayTeam] = item["Away Team Goals"];
    } else {
      acc[awayTeam] += item["Away Team Goals"];
    }
    return acc;
  }, {});

  let maxGoal = 0;
  let EnCokGolAtan = "";
  for (const team in goals) {
    if (goals[team] > maxGoal) {
      maxGoal = goals[team];
      EnCokGolAtan = team;
    }
  }
  return EnCokGolAtan;
}
// console.log(EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
  let finaller = data.filter((mac) => mac.Stage == "Final");
  let goals = finaller.reduce((acc, item) => {
    let homeTeam = item["Away Team Initials"];
    if (acc[homeTeam] == undefined) {
      acc[homeTeam] = item["Home Team Goals"];
    } else {
      acc[homeTeam] += item["Home Team Goals"];
    }
    let awayTeam = item["Home Team Initials"];
    if (acc[awayTeam] == undefined) {
      acc[awayTeam] = item["Away Team Goals"];
    } else {
      acc[awayTeam] += item["Away Team Goals"];
    }
    return acc;
  }, {});

  let maxGoal = 0;
  let EnCokGolAtan = "";
  for (const team in goals) {
    if (goals[team] > maxGoal) {
      maxGoal = goals[team];
      EnCokGolAtan = team;
    }
  }
  return EnCokGolAtan;
}

// console.log(EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
