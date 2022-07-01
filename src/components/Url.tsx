import axios, { AxiosResponse } from 'axios'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

interface ExchangeType {
  rate: number
  createtime: string
}

const initExchange = {
  rate: 0,
  createtime: '',
}

const AddComma = (num: number): string => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g
  let comma = num.toString().replace(regexp, ',')
  if (comma.indexOf('.') !== -1) {
    return comma.slice(0, comma.indexOf('.'))
  }

  return comma
}

const Url = () => {
  const [img, setImg] = useState<string>('')
  const [exchange, setExchange] = useState<ExchangeType>(initExchange)
  const [origPrice, setOrigPrice] = useState<number>(0)
  const [checkConsume, setCheckConsume] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [addPrice, setAddPrice] = useState<number>(0)
  const [urlError, setUrlError] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // const [url, setUrl] = useRecoilState(urlState)

  // get exchange rate
  useEffect(() => {
    const result = axios.get<ExchangeType>('http://localhost:5000/exchange')
    result
      .then((response) => {
        setExchange({
          rate: response.data.rate,
          createtime: response.data.createtime,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const onClickButton = () => {
    if (inputRef.current) {
      const url = inputRef.current.value
      const result = axios.get('http://localhost:5000/test', {
        params: {
          url: url,
        },
      })

      result
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            setImg(response.data.img)
            setOrigPrice(response.data.price)

            setUrlError(false)
          } else {
            setUrlError(true)
            setOrigPrice(0)
          }
        })
        .catch((err) => {
          console.log(err)
          setUrlError(true)
          setOrigPrice(0)
        })
    }
  }

  const onChangeConsume = () => {
    if (checkConsume === true) {
      setTotalPrice(origPrice * 0.9)
    } else {
      setTotalPrice(origPrice)
    }
    setCheckConsume(!checkConsume)
  }

  return (
    <>
      <div>
        <label>URL 입력</label>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:shadow-outline w-11/12"
            placeholder="상품 URL을 입력하세요"
          />
          <button
            type="button"
            className="border rounded w-1/12"
            onClick={onClickButton}
          >
            검색
          </button>
        </div>
        {urlError && <div>ERROR</div>}
      </div>

      {origPrice !== 0 && <div>url</div>}
      <div className="mt-10">
        <div className="flex">
          <div className="w-1/2 p-5">{/* {img && <img src={img} />} */}</div>
          <div className="w-1/2 flex flex-col pr-5">
            <div className="mb-10">
              <label className="block w-full mb-2 ml-1">판매가격</label>
              <span className="block w-full text-right text-sm pr-2">
                ¥ {AddComma(origPrice)}
              </span>
              <div className="relative">
                <div
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                  id="price"
                >
                  {AddComma((origPrice * exchange.rate) / 100)} 원
                </div>
              </div>
            </div>

            <hr className="py-2.5" />

            <div className="mb-10">
              <input type="checkbox" id="l1" onChange={onChangeConsume} />
              <label className="mb-2 ml-3" htmlFor="l1">
                직배송 받기 (소비세 제외)
              </label>
            </div>

            {checkConsume && (
              <div className="mb-10">
                <label className="block w-full mb-2 ml-1">
                  소비세 제외가격
                </label>
                <span className="block w-full text-right text-sm pr-2">
                  ¥ {AddComma(origPrice * 0.9)}
                </span>
                <div className="relative">
                  <div
                    className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                    id="price"
                  >
                    {AddComma((origPrice * 0.9 * exchange.rate) / 100)} 원
                  </div>
                </div>
              </div>
            )}

            <div className="mb-10">
              <label className="block w-full mb-2 ml-1">Price</label>
              <span className="block w-full text-right text-sm pr-2">
                ¥ 10,000,000
              </span>
              <div className="relative">
                <div
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                  id="price"
                >
                  11,000,000 원
                </div>
              </div>
            </div>

            <div className="mb-10">
              <label className="block w-full mb-2 ml-1">Price</label>
              <span className="block w-full text-right text-sm pr-2">
                ¥ 10,000,000
              </span>
              <div className="relative">
                <div
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                  id="price"
                >
                  11,000,000 원
                </div>
              </div>
            </div>

            <div className="mb-16">
              <label className="block w-full mb-2 ml-1">Price</label>
              <span className="block w-full text-right text-sm pr-2">
                ¥ 10,000,000
              </span>
              <div className="relative">
                <div
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                  id="price"
                >
                  11,000,000 원
                </div>
              </div>
            </div>

            <div>
              <div className="text-right text-sm">
                <div>환율 정보 ({exchange.createtime.slice(0, 10)})</div>
                <div>1000원 : {exchange.rate}엔</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Url
