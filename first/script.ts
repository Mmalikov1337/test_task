class Conjugateable {
	word: string;
	constructor(word: string) {
		this.word = word.toLocaleLowerCase();
	}

	conjugate(pronoun: string) {
		if (exceptions.includes(this.word)) return this.word;
		const { face, plural } = this.getFaceAndPlural(pronoun);
		const { conjugation, end } = this.getConjugationAndEnd();
		console.log({ face, plural, conjugation, end });

		if (!face || !conjugation) return "";
		if (face === 1 && !plural) {
			return this.conjugateSingularFirst(end);
		}
		if (face === 1 && !plural) {
			return this.conjugateSingularFirst(end);
		}
		if (face === 2 && !plural) {
			return this.conjugateSingularSecond(end, conjugation);
		}
		return this.word;
	}
	getFaceAndPlural(pronoun: string): { face: number; plural: boolean } {
		// определение лица местоимения
		switch (pronoun.toLowerCase()) {
			case "мы":
				return { face: 1, plural: true };
			case "я":
				return { face: 1, plural: false };
			case "ты":
				return { face: 2, plural: false };
			case "вы":
				return { face: 2, plural: true };
			case "он":
			case "она":
			case "оно":
				return { face: 3, plural: false };
			case "они":
				return { face: 3, plural: true };
			default:
				console.log("Лицо не определено", pronoun);
				return { face: 0, plural: false };
		}
	}

	getConjugationAndEnd(): {
		conjugation: number;
		end: string;
	} {
		// возвращает спряжение 1 или 2 и окончание
		const wordEnd = this.word.substring(
			this.word.length - 3,
			this.word.length
		);
		const firstEnds = ["еть", "ать", "ять"];
		const secondEnds = ["ить"];

		if (firstEnds.includes(wordEnd)) {
			return { conjugation: 1, end: wordEnd };
		}
		if (secondEnds.includes(wordEnd)) {
			return { conjugation: 2, end: wordEnd };
		}
		console.log("Спряжение не определено", { word: this.word });
		return { conjugation: 0, end: wordEnd };
	}

	private editLastByEndFirst(body: string, end: string): string {
		if (end === "ить") {
			// console.log({ last: body[body.length - 1] });

			switch (body[body.length - 1]) {
				case "з":
				case "д": {
					return body.substring(0, body.length - 1) + "ж";
				}
				case "б":
				case "п":
				case "в": {
					return body + "л";
				}
				case "т": {
					return body.substring(0, body.length - 1) + "ч";
				}
				case "с": {
					return body.substring(0, body.length - 1) + "ш";
				}
				default:
					break;
			}
		}
		if (end === "еть") {
			// console.log({ last: body[body.length - 1] });
			switch (body[body.length - 1]) {
				case "н":
				case "т":
				case "в":
				case "ж":
				case "б":
				case "л": {
					return body + "е";
				}
				case "п":
				case "м": {
					return body + "л";
				}
				case "с": {
					return body.substring(0, body.length - 1) + "ш";
				}
				default:
					break;
			}
		}
		return body;
	}
	private conjugateSingularFirst(end: string): string {
		// спрягать 1л ед.ч (звонить ->(я)звоню)
		const separated = this.word.replace(end, ""); //убрать конец(звонить ->звон)]
		const hissing = "жчшщ".split("");
		const withEditedLast = this.editLastByEndFirst(separated, end);

		// console.log({ separated });
		if (hissing.includes(withEditedLast[withEditedLast.length - 1])) {
			return withEditedLast + "у";
		}
		return withEditedLast + "ю";
	}
	private conjugateSingularSecond(end: string, conjugation: number): string {
		// спрягать 2л ед.ч (звонить ->(я)звоню)
		const separated = this.word.replace(end, ""); //убрать конец(звонить ->звон)]
		// const withEditedLast = editLastByEnd(separated, end);
		if (separated[separated.length - 1] === "е") {
			// Глаголы с шипящим на конце всегда пишутся с мягким знаком
			return separated + "ешь";
		}
		return separated + "е" + "ешь";
	}
}
const exceptions = [
	"гнать",
	"держать",
	"дышать",
	"обидеть",
	"слышать",
	"видеть",
	"ненавидеть",
	"смотреть",
	"вертеть",
	"зависеть",
	"терпеть",
	"брить",
	"стелить",
	"зыбиться",
	"зыждиться",
];

// console.log(conjugate("прыгать", "я"));
// console.log(conjugate("прыгать", "ты"));
// console.log(conjugate("прыгать", "вы"));
// console.log(conjugate("прыгать", "мы"));
// console.log("------------------------");
// console.log(conjugate("любить", "я"));
// console.log(conjugate("любить", "ты"));
// console.log(conjugate("любить", "вы"));
// console.log(conjugate("любить", "мы"));
// console.log("------------------------");
// console.log(conjugate("играть", "я"));
// console.log(conjugate("играть", "ты"));
// console.log(conjugate("играть", "вы"));
// console.log(conjugate("играть", "мы"));
// console.log("------------------------");
// console.log(conjugate("сидеть", "я"));
// console.log(conjugate("сидеть", "ты"));
// console.log(conjugate("сидеть", "вы"));
// console.log(conjugate("сидеть", "мы"));
// console.log("------------------------");
// console.log(conjugate("лежать", "я"));
// console.log(conjugate("лежать", "ты"));
// console.log(conjugate("лежать", "вы"));
// console.log(conjugate("лежать", "мы"));
//
//ить 1л едч
// console.log("звонить ->", conjugate("звонить", "я"));
// console.log("вывозить ->", conjugate("вывозить", "я"));
// console.log("любить ->", conjugate("любить", "я"));
// console.log("клеить ->", conjugate("клеить", "я"));
// console.log("лепить ->", conjugate("лепить", "я"));
// console.log("ставить ->", conjugate("ставить", "я"));
// console.log("бурить ->", conjugate("бурить", "я"));
// console.log("копить ->", conjugate("копить", "я"));
// console.log("чертить ->", conjugate("чертить", "я"));
// console.log("косить ->", conjugate("косить", "я"));
// console.log("коптить ->", conjugate("коптить", "я"));
// console.log("водить ->", conjugate("водить", "я"));
// console.log("верить ->", conjugate("верить", "я"));
// console.log("жалить ->", conjugate("жалить", "я"));
// console.log("хвалить ->", conjugate("хвалить", "я"));
// console.log("молить ->", conjugate("молить", "я"));
// console.log("вялить ->", conjugate("вялить", "я"));
// console.log("винить ->", conjugate("винить", "я"));
// console.log("водить ->", conjugate("водить", "я"));
// console.log("возить ->", conjugate("возить", "я"));
// console.log("вопить ->", conjugate("вопить", "я"));
// console.log("помнить ->", conjugate("помнить", "я"));
// console.log("готовить ->", conjugate("готовить", "я"));
// console.log("тревожить ->", conjugate("тревожить", "я"));

// console.log("белеть -> ", conjugate("белеть", "я"));
// console.log("болеть -> ", conjugate("болеть", "я"));
// console.log("висеть -> ", conjugate("висеть", "я"));
// console.log("гореть -> ", conjugate("гореть", "я"));
// console.log("гудеть -> ", conjugate("гудеть", "я"));
// console.log("тускнеть -> ", conjugate("тускнеть", "я"));
// console.log("стерпеть -> ", conjugate("стерпеть", "я"));
// console.log("толстеть -> ", conjugate("толстеть", "я"));
// console.log("шуметь -> ", conjugate("шуметь", "я"));
// console.log("трезветь -> ", conjugate("трезветь", "я"));
// console.log("худеть -> ", conjugate("худеть", "я"));
// console.log("хотеть -> ", conjugate("хотеть", "я"));
// console.log("сидеть -> ", conjugate("сидеть", "я"));
// console.log("сопеть -> ", conjugate("сопеть", "я"));
// console.log("влажнеть -> ", conjugate("влажнеть", "я"));
// console.log("богатеть -> ", conjugate("богатеть", "я"));
// console.log("розоветь -> ", conjugate("розоветь", "я"));
// console.log("глупеть -> ", conjugate("глупеть", "я"));

// console.log("подклеть -> ", conjugate("подклеть", "я"));
// console.log("подудеть -> ", conjugate("подудеть", "я"));
// console.log("подюжеть -> ", conjugate("подюжеть", "я"));
// console.log("пожалеть -> ", conjugate("пожалеть", "я"));
// console.log("пожидеть -> ", conjugate("пожидеть", "я"));
// console.log("покипеть -> ", conjugate("покипеть", "я"));
// console.log("поколеть -> ", conjugate("поколеть", "я"));
// console.log("полеветь -> ", conjugate("полеветь", "я"));
// console.log("полететь -> ", conjugate("полететь", "я"));
// console.log("полысеть -> ", conjugate("полысеть", "я"));
// console.log("помелеть -> ", conjugate("помелеть", "я"));
// console.log("помереть -> ", conjugate("помереть", "я"));
// console.log("поноветь -> ", conjugate("поноветь", "я"));
// console.log("попереть -> ", conjugate("попереть", "я"));
// console.log("попотеть -> ", conjugate("попотеть", "я"));
// console.log("порадеть -> ", conjugate("порадеть", "я"));
// console.log("пореветь -> ", conjugate("пореветь", "я"));
// console.log("поредеть -> ", conjugate("поредеть", "я"));
// console.log("порусеть -> ", conjugate("порусеть", "я"));
// console.log("порыжеть -> ", conjugate("порыжеть", "я"));
// console.log("порябеть -> ", conjugate("порябеть", "я"));
// console.log("поседеть -> ", conjugate("поседеть", "я"));
// console.log("посереть -> ", conjugate("посереть", "я"));
// console.log("посиветь -> ", conjugate("посиветь", "я"));
// console.log("посидеть -> ", conjugate("посидеть", "я"));
// console.log("посинеть -> ", conjugate("посинеть", "я"));
// console.log("посипеть -> ", conjugate("посипеть", "я"));
// console.log("посопеть -> ", conjugate("посопеть", "я"));
// console.log("потереть -> ", conjugate("потереть", "я"));
// console.log("поумнеть -> ", conjugate("поумнеть", "я"));
// console.log("похудеть -> ", conjugate("похудеть", "я"));
// console.log("пошипеть -> ", conjugate("пошипеть", "я"));
// console.log("пошуметь -> ", conjugate("пошуметь", "я"));
// console.log("презреть -> ", conjugate("презреть", "я"));
// console.log("пригреть -> ", conjugate("пригреть", "я"));
// console.log("призреть -> ", conjugate("призреть", "я"));
// console.log("приодеть -> ", conjugate("приодеть", "я"));
// console.log("приспеть -> ", conjugate("приспеть", "я"));
// console.log("прогреть -> ", conjugate("прогреть", "я"));
// console.log("прозреть -> ", conjugate("прозреть", "я"));
// console.log("пропреть -> ", conjugate("пропреть", "я"));
// console.log("простеть -> ", conjugate("простеть", "я"));
// console.log("протлеть -> ", conjugate("протлеть", "я"));
// console.log("прочнеть -> ", conjugate("прочнеть", "я"));
// console.log("разодеть -> ", conjugate("разодеть", "я"));
// console.log("разуметь -> ", conjugate("разуметь", "я"));
// console.log("роговеть -> ", conjugate("роговеть", "я"));
// console.log("розоветь -> ", conjugate("розоветь", "я"));
// console.log("румянеть -> ", conjugate("румянеть", "я"));
// console.log("сатанеть -> ", conjugate("сатанеть", "я"));
// console.log("свербеть -> ", conjugate("свербеть", "я"));
// console.log("свертеть -> ", conjugate("свертеть", "я"));
// console.log("светлеть -> ", conjugate("светлеть", "я"));
// console.log("свистеть -> ", conjugate("свистеть", "я"));
// console.log("сиротеть -> ", conjugate("сиротеть", "я"));
// console.log("скорбеть -> ", conjugate("скорбеть", "я"));
// console.log("скрипеть -> ", conjugate("скрипеть", "я"));
// console.log("скучнеть -> ", conjugate("скучнеть", "я"));
// console.log("смердеть -> ", conjugate("смердеть", "я"));
// console.log("смирнеть -> ", conjugate("смирнеть", "я"));
// console.log("смотреть -> ", conjugate("смотреть", "я"));
// console.log("смуглеть -> ", conjugate("смуглеть", "я"));
// console.log("сожалеть -> ", conjugate("сожалеть", "я"));
// console.log("соловеть -> ", conjugate("соловеть", "я"));
// console.log("солодеть -> ", conjugate("солодеть", "я"));
// console.log("солонеть -> ", conjugate("солонеть", "я"));
// console.log("стемнеть -> ", conjugate("стемнеть", "я"));
// console.log("стерпеть -> ", conjugate("стерпеть", "я"));
// console.log("суроветь -> ", conjugate("суроветь", "я"));
// console.log("твердеть -> ", conjugate("твердеть", "я"));
// console.log("толстеть -> ", conjugate("толстеть", "я"));
// console.log("трезветь -> ", conjugate("трезветь", "я"));
// console.log("трухлеть -> ", conjugate("трухлеть", "я"));
// console.log("трухтеть -> ", conjugate("трухтеть", "я"));
// console.log("тускнеть -> ", conjugate("тускнеть", "я"));
// console.log("тяготеть -> ", conjugate("тяготеть", "я"));
// console.log("тяжелеть -> ", conjugate("тяжелеть", "я"));
// console.log("углядеть -> ", conjugate("углядеть", "я"));
// console.log("угрюметь -> ", conjugate("угрюметь", "я"));
// console.log("устареть -> ", conjugate("устареть", "я"));
// console.log("утерпеть -> ", conjugate("утерпеть", "я"));
// console.log("холодеть -> ", conjugate("холодеть", "я"));
// console.log("хорошеть -> ", conjugate("хорошеть", "я"));
// console.log("храбреть -> ", conjugate("храбреть", "я"));
// console.log("хрустеть -> ", conjugate("хрустеть", "я"));
// console.log("цепенеть -> ", conjugate("цепенеть", "я"));
// console.log("ядренеть -> ", conjugate("ядренеть", "я"));

//2 л ед
// console.log("звонить ->", conjugate("звонить", "ты"));
// console.log("вывозить ->", conjugate("вывозить", "ты"));
// console.log("любить ->", conjugate("любить", "ты"));
// console.log("клеить ->", conjugate("клеить", "ты"));
// console.log("лепить ->", conjugate("лепить", "ты"));
// console.log("ставить ->", conjugate("ставить", "ты"));
// console.log("бурить ->", conjugate("бурить", "ты"));
// console.log("копить ->", conjugate("копить", "ты"));
// console.log("чертить ->", conjugate("чертить", "ты"));
// console.log("косить ->", conjugate("косить", "ты"));
// console.log("коптить ->", conjugate("коптить", "ты"));
// console.log("водить ->", conjugate("водить", "ты"));
// console.log("верить ->", conjugate("верить", "ты"));
// console.log("жалить ->", conjugate("жалить", "ты"));
// console.log("хвалить ->", conjugate("хвалить", "ты"));
// console.log("молить ->", conjugate("молить", "ты"));
// console.log("вялить ->", conjugate("вялить", "ты"));
// console.log("винить ->", conjugate("винить", "ты"));
// console.log("водить ->", conjugate("водить", "ты"));
// console.log("возить ->", conjugate("возить", "ты"));
// console.log("вопить ->", conjugate("вопить", "ты"));
// console.log("помнить ->", conjugate("помнить", "ты"));
// console.log("готовить ->", conjugate("готовить", "ты"));
// console.log("тревожить ->", conjugate("тревожить", "ты"));

console.log("подклеть -> ", conjugate("подклеть", "я"));
console.log("подудеть -> ", conjugate("подудеть", "ты"));
console.log("подюжеть -> ", conjugate("подюжеть", "ты"));
console.log("пожалеть -> ", conjugate("пожалеть", "ты"));
console.log("пожидеть -> ", conjugate("пожидеть", "ты"));
console.log("покипеть -> ", conjugate("покипеть", "ты"));
console.log("поколеть -> ", conjugate("поколеть", "ты"));
console.log("полеветь -> ", conjugate("полеветь", "ты"));
console.log("полететь -> ", conjugate("полететь", "ты"));
console.log("полысеть -> ", conjugate("полысеть", "ты"));
console.log("помелеть -> ", conjugate("помелеть", "ты"));
console.log("помереть -> ", conjugate("помереть", "ты"));
console.log("поноветь -> ", conjugate("поноветь", "ты"));
console.log("попереть -> ", conjugate("попереть", "ты"));
console.log("попотеть -> ", conjugate("попотеть", "ты"));
console.log("порадеть -> ", conjugate("порадеть", "ты"));
console.log("пореветь -> ", conjugate("пореветь", "ты"));
console.log("поредеть -> ", conjugate("поредеть", "ты"));
console.log("порусеть -> ", conjugate("порусеть", "ты"));
console.log("порыжеть -> ", conjugate("порыжеть", "ты"));
console.log("порябеть -> ", conjugate("порябеть", "ты"));
console.log("поседеть -> ", conjugate("поседеть", "ты"));
console.log("посереть -> ", conjugate("посереть", "ты"));
console.log("посиветь -> ", conjugate("посиветь", "ты"));
console.log("посидеть -> ", conjugate("посидеть", "ты"));
console.log("посинеть -> ", conjugate("посинеть", "ты"));
console.log("посипеть -> ", conjugate("посипеть", "ты"));
console.log("посопеть -> ", conjugate("посопеть", "ты"));
console.log("потереть -> ", conjugate("потереть", "ты"));
console.log("поумнеть -> ", conjugate("поумнеть", "ты"));
console.log("похудеть -> ", conjugate("похудеть", "ты"));
console.log("пошипеть -> ", conjugate("пошипеть", "ты"));
console.log("пошуметь -> ", conjugate("пошуметь", "ты"));
console.log("презреть -> ", conjugate("презреть", "ты"));
console.log("пригреть -> ", conjugate("пригреть", "ты"));
console.log("призреть -> ", conjugate("призреть", "ты"));
console.log("приодеть -> ", conjugate("приодеть", "ты"));
console.log("приспеть -> ", conjugate("приспеть", "ты"));
console.log("прогреть -> ", conjugate("прогреть", "ты"));
console.log("прозреть -> ", conjugate("прозреть", "ты"));
console.log("пропреть -> ", conjugate("пропреть", "ты"));
console.log("простеть -> ", conjugate("простеть", "ты"));
console.log("протлеть -> ", conjugate("протлеть", "ты"));
console.log("прочнеть -> ", conjugate("прочнеть", "ты"));
console.log("разодеть -> ", conjugate("разодеть", "ты"));
console.log("разуметь -> ", conjugate("разуметь", "ты"));
console.log("роговеть -> ", conjugate("роговеть", "ты"));
console.log("розоветь -> ", conjugate("розоветь", "ты"));
console.log("румянеть -> ", conjugate("румянеть", "ты"));
console.log("сатанеть -> ", conjugate("сатанеть", "ты"));
console.log("свербеть -> ", conjugate("свербеть", "ты"));
console.log("свертеть -> ", conjugate("свертеть", "ты"));
console.log("светлеть -> ", conjugate("светлеть", "ты"));
console.log("свистеть -> ", conjugate("свистеть", "ты"));
console.log("сиротеть -> ", conjugate("сиротеть", "ты"));
console.log("скорбеть -> ", conjugate("скорбеть", "ты"));
console.log("скрипеть -> ", conjugate("скрипеть", "ты"));
console.log("скучнеть -> ", conjugate("скучнеть", "ты"));
console.log("смердеть -> ", conjugate("смердеть", "ты"));
console.log("смирнеть -> ", conjugate("смирнеть", "ты"));
console.log("смотреть -> ", conjugate("смотреть", "ты"));
console.log("смуглеть -> ", conjugate("смуглеть", "ты"));
console.log("сожалеть -> ", conjugate("сожалеть", "ты"));
console.log("соловеть -> ", conjugate("соловеть", "ты"));
console.log("солодеть -> ", conjugate("солодеть", "ты"));
console.log("солонеть -> ", conjugate("солонеть", "ты"));
console.log("стемнеть -> ", conjugate("стемнеть", "ты"));
console.log("стерпеть -> ", conjugate("стерпеть", "ты"));
console.log("суроветь -> ", conjugate("суроветь", "ты"));
console.log("твердеть -> ", conjugate("твердеть", "ты"));
console.log("толстеть -> ", conjugate("толстеть", "ты"));
console.log("трезветь -> ", conjugate("трезветь", "ты"));
console.log("трухлеть -> ", conjugate("трухлеть", "ты"));
console.log("трухтеть -> ", conjugate("трухтеть", "ты"));
console.log("тускнеть -> ", conjugate("тускнеть", "ты"));
console.log("тяготеть -> ", conjugate("тяготеть", "ты"));
console.log("тяжелеть -> ", conjugate("тяжелеть", "ты"));
console.log("углядеть -> ", conjugate("углядеть", "ты"));
console.log("угрюметь -> ", conjugate("угрюметь", "ты"));
console.log("устареть -> ", conjugate("устареть", "ты"));
console.log("утерпеть -> ", conjugate("утерпеть", "ты"));
console.log("холодеть -> ", conjugate("холодеть", "ты"));
console.log("хорошеть -> ", conjugate("хорошеть", "ты"));
console.log("храбреть -> ", conjugate("храбреть", "ты"));
console.log("хрустеть -> ", conjugate("хрустеть", "ты"));
console.log("цепенеть -> ", conjugate("цепенеть", "ты"));
console.log("ядренеть -> ", conjugate("ядренеть", "ты"));
function conjugate(word: string, pronoun: string) {
	const instance = new Conjugateable(word);
	return instance.conjugate(pronoun);
}

// console.log("подклеть -> ", conjugate("подклеть", "ты"));
// console.log("подудеть -> ", conjugate("подудеть", "ты"));
// console.log("подюжеть -> ", conjugate("подюжеть", "ты"));
// console.log("пожалеть -> ", conjugate("пожалеть", "ты"));
// console.log("пожидеть -> ", conjugate("пожидеть", "ты"));
// console.log("покипеть -> ", conjugate("покипеть", "ты"));
// console.log("поколеть -> ", conjugate("поколеть", "ты"));
// console.log("полеветь -> ", conjugate("полеветь", "ты"));
// console.log("полететь -> ", conjugate("полететь", "ты"));
// console.log("полысеть -> ", conjugate("полысеть", "ты"));
// console.log("помелеть -> ", conjugate("помелеть", "ты"));
// console.log("помереть -> ", conjugate("помереть", "ты"));
// console.log("поноветь -> ", conjugate("поноветь", "ты"));
// console.log("попереть -> ", conjugate("попереть", "ты"));
// console.log("попотеть -> ", conjugate("попотеть", "ты"));
// console.log("порадеть -> ", conjugate("порадеть", "ты"));
// console.log("пореветь -> ", conjugate("пореветь", "ты"));
// console.log("поредеть -> ", conjugate("поредеть", "ты"));
// console.log("порусеть -> ", conjugate("порусеть", "ты"));
// console.log("порыжеть -> ", conjugate("порыжеть", "ты"));
// console.log("порябеть -> ", conjugate("порябеть", "ты"));
// console.log("поседеть -> ", conjugate("поседеть", "ты"));
// console.log("посереть -> ", conjugate("посереть", "ты"));
// console.log("посиветь -> ", conjugate("посиветь", "ты"));
// console.log("посидеть -> ", conjugate("посидеть", "ты"));
// console.log("посинеть -> ", conjugate("посинеть", "ты"));
// console.log("посипеть -> ", conjugate("посипеть", "ты"));
// console.log("посопеть -> ", conjugate("посопеть", "ты"));
// console.log("потереть -> ", conjugate("потереть", "ты"));
// console.log("поумнеть -> ", conjugate("поумнеть", "ты"));
// console.log("похудеть -> ", conjugate("похудеть", "ты"));
// console.log("пошипеть -> ", conjugate("пошипеть", "ты"));
// console.log("пошуметь -> ", conjugate("пошуметь", "ты"));
// console.log("презреть -> ", conjugate("презреть", "ты"));
// console.log("пригреть -> ", conjugate("пригреть", "ты"));
// console.log("призреть -> ", conjugate("призреть", "ты"));
// console.log("приодеть -> ", conjugate("приодеть", "ты"));
// console.log("приспеть -> ", conjugate("приспеть", "ты"));
// console.log("прогреть -> ", conjugate("прогреть", "ты"));
// console.log("прозреть -> ", conjugate("прозреть", "ты"));
// console.log("пропреть -> ", conjugate("пропреть", "ты"));
// console.log("простеть -> ", conjugate("простеть", "ты"));
// console.log("протлеть -> ", conjugate("протлеть", "ты"));
// console.log("прочнеть -> ", conjugate("прочнеть", "ты"));
// console.log("разодеть -> ", conjugate("разодеть", "ты"));
// console.log("разуметь -> ", conjugate("разуметь", "ты"));
// console.log("роговеть -> ", conjugate("роговеть", "ты"));
// console.log("розоветь -> ", conjugate("розоветь", "ты"));
// console.log("румянеть -> ", conjugate("румянеть", "ты"));
// console.log("сатанеть -> ", conjugate("сатанеть", "ты"));
// console.log("свербеть -> ", conjugate("свербеть", "ты"));
// console.log("свертеть -> ", conjugate("свертеть", "ты"));
// console.log("светлеть -> ", conjugate("светлеть", "ты"));
// console.log("свистеть -> ", conjugate("свистеть", "ты"));
// console.log("сиротеть -> ", conjugate("сиротеть", "ты"));
// console.log("скорбеть -> ", conjugate("скорбеть", "ты"));
// console.log("скрипеть -> ", conjugate("скрипеть", "ты"));
// console.log("скучнеть -> ", conjugate("скучнеть", "ты"));
// console.log("смердеть -> ", conjugate("смердеть", "ты"));
// console.log("смирнеть -> ", conjugate("смирнеть", "ты"));
// console.log("смотреть -> ", conjugate("смотреть", "ты"));
// console.log("смуглеть -> ", conjugate("смуглеть", "ты"));
// console.log("сожалеть -> ", conjugate("сожалеть", "ты"));
// console.log("соловеть -> ", conjugate("соловеть", "ты"));
// console.log("солодеть -> ", conjugate("солодеть", "ты"));
// console.log("солонеть -> ", conjugate("солонеть", "ты"));
// console.log("стемнеть -> ", conjugate("стемнеть", "ты"));
// console.log("стерпеть -> ", conjugate("стерпеть", "ты"));
// console.log("суроветь -> ", conjugate("суроветь", "ты"));
// console.log("твердеть -> ", conjugate("твердеть", "ты"));
// console.log("толстеть -> ", conjugate("толстеть", "ты"));
// console.log("трезветь -> ", conjugate("трезветь", "ты"));
// console.log("трухлеть -> ", conjugate("трухлеть", "ты"));
// console.log("трухтеть -> ", conjugate("трухтеть", "ты"));
// console.log("тускнеть -> ", conjugate("тускнеть", "ты"));
// console.log("тяготеть -> ", conjugate("тяготеть", "ты"));
// console.log("тяжелеть -> ", conjugate("тяжелеть", "ты"));
// console.log("углядеть -> ", conjugate("углядеть", "ты"));
// console.log("угрюметь -> ", conjugate("угрюметь", "ты"));
// console.log("устареть -> ", conjugate("устареть", "ты"));
// console.log("утерпеть -> ", conjugate("утерпеть", "ты"));
// console.log("холодеть -> ", conjugate("холодеть", "ты"));
// console.log("хорошеть -> ", conjugate("хорошеть", "ты"));
// console.log("храбреть -> ", conjugate("храбреть", "ты"));
// console.log("хрустеть -> ", conjugate("хрустеть", "ты"));
// console.log("цепенеть -> ", conjugate("цепенеть", "ты"));
// console.log("ядренеть -> ", conjugate("ядренеть", "ты"));
