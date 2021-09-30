import { Token } from 'services/observables/tokens';
import { prettifyNumber } from 'utils/helperFunctions';
import BigNumber from 'bignumber.js';
import { sanitizeNumberInput } from 'utils/pureFunctions';

interface Props {
  bnt: Token;
  tkn: Token;
  bntTknRate: string;
  tknUsdPrice: string;
  setTknUsdPrice: Function;
}

export const AddLiquidityEmptyStep1 = ({
  bnt,
  tkn,
  tknUsdPrice,
  setTknUsdPrice,
  bntTknRate,
}: Props) => {
  return (
    <div className="px-10">
      <div className="flex items-center">
        <div className="flex justify-center items-center w-[34px] h-[34px] border-2 border-blue-0 rounded-full text-primary text-16">
          1
        </div>
        <div className="ml-10 font-medium">Please enter the token prices</div>
      </div>
      <div className="grid grid-cols-2 mt-20 gap-30">
        <div>
          <div className="text-20 ml-10 mb-6">1 BNT =</div>
          <input
            type="text"
            className="px-20 py-12 border-2 border-blue-0 text-20 text-right rounded-20 w-full"
            value={`~${prettifyNumber(bnt.usdPrice!, true)}`}
          />
        </div>
        <div>
          <div className="text-20 ml-10 mb-6">1 {tkn.symbol} =</div>
          <input
            type="text"
            className="px-20 py-12 border-2 border-blue-0 text-20 text-right rounded-20 w-full"
            placeholder="~$0.00"
            value={`~$${tknUsdPrice}`}
            onChange={(e) =>
              setTknUsdPrice(sanitizeNumberInput(e.target.value))
            }
          />
        </div>
      </div>
      <div className="ml-10 mt-10 text-grey-4">
        1 BNT ({prettifyNumber(bnt.usdPrice!, true)}) ={' '}
        {new BigNumber(tknUsdPrice).gt(9) ? prettifyNumber(bntTknRate) : 0}{' '}
        {tkn.symbol} (
        {prettifyNumber(new BigNumber(bntTknRate).times(tknUsdPrice), true)})
      </div>
    </div>
  );
};
