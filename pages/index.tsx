import Head from "next/head";
import bg from "../public/background.jpg";
import Image from "next/image";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase-config";
import { useRouter } from "next/router";
import { FormLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import zIndex from "@mui/material/styles/zIndex";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [offer, setOffer] = useState(1);
  const [province, setProvince] = useState("");
  const [number, setNumber] = useState<any>(null);
  const [nameErr, setNameErr] = useState(false);
  const [numberErr, setNumberErr] = useState(false);
  const [provinceErr, setProvinceErr] = useState(false);
  const [formErr, setFormErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("1.webp");
  const [size, setSize] = useState(1);
  const router = useRouter();

  const handleAddLead = async (e: any) => {
    e.preventDefault();
    if (fullName !== "" && province !== "" && number !== "") {
      try {
        setIsLoading(true);
        const leadsRef = collection(db, "leads");
        const offerValue = offer === 2 ? "oil + champoing" : "oil";
        setFormErr(false);
        await addDoc(leadsRef, {
          fullName,
          address,
          province,
          number,
          timestamp: serverTimestamp(),
          size,
          source: "traffic",
        });

        router.push("/thankyou");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErr(true);
    }
  };

  const handleSetError = (field: string) => {
    if (field == "name") {
      if (fullName === "") {
        setNameErr(true);
      } else {
        setNameErr(false);
      }
    } else if (field === "number") {
      if (number === null) {
        setNumberErr(true);
      } else {
        setNumberErr(false);
      }
    } else if (field === "province") {
      if (province === "") {
        setProvinceErr(true);
      } else {
        setProvinceErr(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Shopydz - Baby jumpsuit</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="facebook-domain-verification"
          content="ynykw1m2veggq9pspm51wz52v86v1m"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-auto bg-no-repeat bg-center">
        <header className="bg-white border-b fixed top-0 h-20 w-full z-20">
          <div className="w-full flex justify-between px-3 py-3">
            <div className="py-3">
              <img src="logo.png" className="h-8" alt="" />
            </div>
            <div className=" mt-3">
              <a
                href="#form"
                className=" bg-green-500 text-white px-6 py-3 rounded-lg font-bold"
              >
                أطلبي الآن
              </a>
            </div>
          </div>
        </header>
        <main className="w-full  mt-20 px-6">
          <div className="w-full pt-4 pb-8 text-center  z-10 mt-4">
            <h1 className="text-5xl mb-2">
              احسن هدية ممكن ان تقدميها لطفلك في هادا الجو البارد
            </h1>
            <h6 className="text-2xl">
              بطانية أطفال بمقاسات مختلفة دفئ و أناقة، المنتج الأكثر طلبا في
              الأسواق{" "}
            </h6>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="w-full hidden md:block">
              <div className="my-4">
                <div>
                  <img src={previewImage} alt="" className="" />
                </div>
                <div className="grid gap-2 grid-cols-5 mt-2">
                  <button onClick={() => setPreviewImage("1.webp")}>
                    <Image src="/1.webp" alt="" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("2.webp")}>
                    <Image src="/2.webp" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("3.webp")}>
                    <Image src="/3.webp" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("4.webp")}>
                    <Image src="/4.webp" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("5.webp")}>
                    <Image src="/5.webp" width={128} height={128} />
                  </button>
                </div>
              </div>
              <div className=" text-right mt-4">
                <h1 className="text-xl mb-2">:كيفية الطلب </h1>
                <div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> أدخلي معلوماتك الشخصية في الإستمارة أعلاه</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> أنقري على أطلب الان</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <div className=" text-right mt-8 mb-8">
                <h1 className="text-xl mb-2">:كيفية الإستلام </h1>
                <p>
                  طريقة بسيط جدا بعد أن تطلب المنتج سيتصل بك أحد موظفي الشركة
                  ليؤكد معك الطلب ، وسنرسل لك المنتج والدفع عند الاستلام
                </p>
              </div>
            </div>
            <div className="w-full block md:hidden">
              <div className="my-4">
                <div>
                  <img src={previewImage} alt="" className="" />
                </div>
                <div className="grid gap-2 grid-cols-5 mt-2">
                  <button onClick={() => setPreviewImage("1.webp")}>
                    <Image src="/1.webp" alt="" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("2.webp")}>
                    <Image src="/2.webp" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("3.webp")}>
                    <Image src="/3.webp" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("4.webp")}>
                    <Image src="/4.webp" width={128} height={128} />
                  </button>
                  <button onClick={() => setPreviewImage("5.webp")}>
                    <Image src="/5.webp" width={128} height={128} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between hidden">
                <Image
                  src="/arrowdown.png"
                  width={72}
                  height={72}
                  alt=""
                  className="-scale-x-100"
                />
                <Image src="/arrowdown.png" width={72} height={72} alt="" />
              </div>
              <div
                className="bg-[#f5f5f5] rounded-2xl border-2 py-4 px-6 border-gray-200"
                id="form"
              >
                <h1 className="text-3xl  font-bold text-center">
                  <span className="text-green-500">(25% تخفيض)</span>
                  <br /> أطلبي الآن واستفيدي من عرض بداية السنة{" "}
                </h1>
                <h3 className="text-lg  text-center">
                  للطلب يرجى ملء هذا النموذج وسوف نتصل بك للتاكيد{" "}
                </h3>
                <form action="#" method="post">
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text  right-0">الإسم و اللقب</span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="الإسم و اللقب"
                      value={fullName}
                      onBlur={() => handleSetError("name")}
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {nameErr && (
                      <p className="text-right text-red-600">ادخل الاسم</p>
                    )}
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text ">رقم الهاتف</span>
                    </label>
                    <input
                      type="number"
                      className="p-3 mt-2 bg-white rounded-md w-full  text-right"
                      placeholder="رقم الهاتف"
                      value={number}
                      onBlur={() => handleSetError("number")}
                      required
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    {numberErr && (
                      <p className="text-right text-red-600">
                        الرجاء إدخال رقم الهاتف
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text ">الولاية</span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="الولاية"
                      value={province}
                      onBlur={() => handleSetError("province")}
                      required
                      onChange={(e) => setProvince(e.target.value)}
                    />
                    {provinceErr && (
                      <p className="text-right text-red-600">
                        الرجاء إدخال الولاية
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text ">البلدية</span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="البلدية"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text ">المقاس</span>
                    </label>

                    <div className="text-right">
                      <RadioGroup
                        aria-labelledby="size"
                        defaultValue="female"
                        className="text-right"
                        value={size}
                        onChange={(e) => setSize(+e.target.value)}
                        name="size"
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio color="success" />}
                          labelPlacement="start"
                          label="من شهر إلى 6 شهور"
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio color="success" />}
                          labelPlacement="start"
                          label="من 6 شهور إلى 12 شهر "
                        />
                      </RadioGroup>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="">
                        <p className=" mr-3 my-6 text-lg text-center">
                          25% تخفيض
                        </p>
                        <p className="sm:flex block text-center justify-center">
                          <span className="text-5xl text-red-500 font-bold  block sm:inline">
                            3900 DA
                          </span>
                          <span className=" text-lg line-through block sm:inline">
                            5200 DA
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {formErr && (
                      <p className="text-center  bg-red-600/60 py-3 rounded-lg mt-4">
                        الرجاء إدخال جميع المعلومات
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      // disabled={!fullName || !number || !province}
                      onClick={handleAddLead}
                      disabled={isLoading}
                      type="submit"
                      className="bg-green-500 text-white button-bounce text-2xl rounded-lg w-full p-4 text-center  font-bold hover:bg-green-400"
                    >
                      {isLoading && <span className="loader"></span>}أطلبي الآن
                    </button>
                  </div>
                  <div className="w-full block md:hidden">
                    {fullName === "" ||
                    number === null ||
                    address === "" ||
                    province === "" ? (
                      <a
                        href="#form"
                        className="bg-green-500 text-white fixed bottom-3 left-3 right-3 text-xl rounded-lg  p-3 text-center  font-bold hover:bg-green-400"
                      >
                        أطلبي الآن
                      </a>
                    ) : (
                      <button
                        onClick={handleAddLead}
                        disabled={isLoading}
                        type="submit"
                        className="bg-green-500 z-20 text-white fixed bottom-3 left-3 right-3 text-xl rounded-lg  p-3 text-center  font-bold hover:bg-green-400"
                      >
                        {isLoading && <span className="loader"></span>}أطلبي
                        الآن
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full block md:hidden " style={{ zIndex: -1 }}>
              {/* <iframe
                // width="560"
                height="315"
                className="w-full  rounded-2xl overflow-hidden"
                src="https://www.youtube.com/embed/cB2vnyM5sEM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}

              <div className=" text-right mt-4">
                <h1 className="text-xl mb-2">:كيفية الطلب </h1>
                <div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> أدخلي معلوماتك الشخصية في الإستمارة أعلاه</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right w-full justify-end mt-3">
                    <span> أنقري على أطلب الان</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <div className=" text-right mt-8 mb-8">
                <h1 className="text-xl mb-2">:كيفية الإستلام </h1>
                <p>
                  طريقة بسيط جدا بعد أن تطلب المنتج سيتصل بك أحد موظفي الشركة
                  ليؤكد معك الطلب ، وسنرسل لك المنتج والدفع عند الاستلام
                </p>
              </div>
              <div className="my-4">
                <Image
                  width={640}
                  height={995}
                  alt=""
                  className=""
                  src="/testimonials.png"
                />
              </div>
            </div>
          </div>

          <div></div>
        </main>
      </div>
    </>
  );
}
