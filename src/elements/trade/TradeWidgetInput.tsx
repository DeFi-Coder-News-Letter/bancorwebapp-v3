import { useAppSelector } from 'store/index';
import { useTokenInputV3Return } from 'elements/trade/useTknFiatInput';
import { Image } from 'components/image/Image';
import { prettifyNumber, toBigNumber } from 'utils/helperFunctions';
import { useRef, useState } from 'react';
import { Token } from 'services/observables/tokens';
import { SearchableTokenList } from 'components/searchableTokenList/SearchableTokenList';

interface Props {
  input?: useTokenInputV3Return;
  isLoading?: boolean;
  onFocus: () => void;
  label?: string;
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
}

export const TradeWidgetInput = ({
  input,
  isLoading,
  onFocus,
  label,
  tokens,
  onTokenSelect,
}: Props) => {
  const isFiat = useAppSelector((state) => state.user.usdToggle);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocusChange = (state: boolean) => {
    if (state) {
      onFocus();
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
    setIsFocused(state);
  };

  return (
    <>
      <div>
        {label && <div className="mb-10 text-secondary">{label}</div>}
        {input ? (
          <div>
            <div
              className={`grid grid-cols-12 border ${
                isFocused ? 'border-primary' : 'border-fog'
              } rounded-20 px-20 h-[75px] flex items-center bg-white dark:bg-grey`}
            >
              <div className="col-span-5">
                <button
                  className="flex items-center space-x-10"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                >
                  {' '}
                  <Image
                    alt={'Token Logo'}
                    className={'w-40 h-40 rounded-full'}
                    src={input.token.logoURI}
                  />
                  <div className="text-20">{input.token.symbol}</div>
                </button>
              </div>
              <div
                onClick={() => handleFocusChange(true)}
                className="col-span-7 text-right"
              >
                {!isLoading ? (
                  <>
                    <input
                      ref={inputRef}
                      type="text"
                      value={isFiat ? input.inputFiat : input.inputTkn}
                      className="w-full text-right text-20 outline-none"
                      onChange={input.handleChange}
                      placeholder={'0.00'}
                      onFocus={() => handleFocusChange(true)}
                      onBlur={() => handleFocusChange(false)}
                    />
                    {toBigNumber(input.inputTkn)
                      .plus(input.inputFiat)
                      .gt(0) && (
                      <div className="text-secondary text-12">
                        {prettifyNumber(
                          !isFiat ? input.inputFiat : input.inputTkn,
                          !isFiat
                        )}{' '}
                        {input.oppositeUnit}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-end">
                    <div className="loading-skeleton h-18 mb-4 w-full" />
                    <div className="loading-skeleton h-12 w-1/2" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            select token
          </button>
        )}
      </div>
      <SearchableTokenList
        onClick={onTokenSelect}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        tokens={tokens}
        excludedTokens={[input?.token.address ?? '']}
        includedTokens={[]}
      />
    </>
  );
};
