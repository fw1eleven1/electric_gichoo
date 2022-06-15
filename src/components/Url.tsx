import axios from 'axios'
import React, { FunctionComponent, useRef, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { urlState } from '../states'

const Url = () => {
  const [img, setImg] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [urlError, setUrlError] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // const [url, setUrl] = useRecoilState(urlState)

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
            setPrice(response.data.price)

            setUrlError(false)
          } else {
            setUrlError(true)
          }
        })
        .catch((err) => {
          console.log(err)
          setUrlError(true)
        })
    }
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

      {price !== 0 && <div>url</div>}
      <div className="mt-10">
        <div className="flex">
          <div className="w-1/2">image</div>
          <div className="w-1/2 flex flex-col pr-5">
            <div className="mb-10">
              <label className="block w-full mb-2 ml-1">Price</label>
              <span className="block w-full text-right text-sm pr-2">
                10,000,000
              </span>
              <input
                type="text"
                className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                id="price"
                readOnly
                value="11,000,000"
              />
            </div>

            <div className="mb-10">
              <label className="block w-full mb-2 ml-1">Price</label>
              <span className="block w-full text-right text-sm pr-2">
                10,000,000
              </span>
              <input
                type="text"
                className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                id="price"
                readOnly
                value="11,000,000"
              />
            </div>

            <div className="mb-10">
              <label className="block w-full mb-2 ml-1">Price</label>
              <span className="block w-full text-right text-sm pr-2">
                10,000,000
              </span>
              <input
                type="text"
                className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                id="price"
                readOnly
                value="11,000,000"
              />
            </div>

            <div className="mb-16">
              <label className="block w-full mb-2 ml-1">Price</label>
              <span className="block w-full text-right text-sm pr-2">
                10,000,000
              </span>
              <input
                type="text"
                className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
                id="price"
                readOnly
                value="11,000,000"
              />
            </div>

            <div>
              <div className="text-right text-sm">
                <div>exchange</div>
                <div>1,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Url
