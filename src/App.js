import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from './Lotto.js';

class App {
  async play() {
    const money = await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n');

    // 예외처리
    if (isNaN(money)) throw new Error("[ERROR] 구입금액은 숫자여야 합니다.");
    if (parseInt(money / 1000) !== money / 1000) throw new Error("[ERROR] 구입금액은 1000원 단위여야 합니다.");
    if (money == 0) throw new Error("[ERROR] 구입금액은 0원 이상이어야 합니다.");

    // 구입금액에 해당하는 만큼 로또 발행
    let count = money / 1000;
    MissionUtils.Console.print(`${count}개를 구매했습니다.`);
    const lottoList = [];
    while(count--) {
      lottoList.push(MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b));
    }
    MissionUtils.Console.print(lottoList);

    // 당첨 번호 입력
    const win = await MissionUtils.Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
    const lotto = new Lotto(win.split(',').map(v=>Number(v)));

    // 보너스 번호 입력
    const bonus = await MissionUtils.Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
    if (isNaN(parseInt(bonus))) throw new Error("[ERROR] 보너스 번호는 숫자여야 합니다.");
    if (1 > bonus || bonus > 45) throw new Error("[ERROR] 보너스 번호는 1~45 사이여야 합니다.");
    if (win.includes(bonus)) throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");

    console.log(lotto.stats(lottoList, bonus));

  }
}

export default App;
