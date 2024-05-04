"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaHeart } from "react-icons/fa";
interface ModalProps {
  text: string;
  onClick: () => void; // Define the type of onClick, adjust as needed for parameters
}

type Quote = [
  {
    quote: string;
    author: string;
    category: string;
  }
];

type Error = {
  error: string;
};

export function Modal({ text, onClick }: ModalProps) {
  let [isOpen, setIsOpen] = useState(false);
  //   console.log("quoteInfo", quoteInfo);
  function closeModal() {
    setIsOpen(false);
  }
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    const response = await fetch("http://localhost:3000/api/quote", {
      method: "POST",
    });

    return response.json();
  }

  async function saveData(quote: Quote) {
    try {
      const quoteData = {
        quote: quote[0].quote,
        category: quote[0].category,
        author: quote[0].author,
        created_at: new Date().toISOString(),
      };

      console.log("quote format", JSON.stringify(quoteData));
      const response = await fetch(
        "http://localhost:8080/api/quotes/addQuote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quoteData),
        }
      );
      if (response.ok) {
        // const jsonResponse = await response;
        // console.log("adding quote response:", jsonResponse);
        return response;
      } else {
        throw new Error("HTTP status " + response);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw to be caught in handleSubmit
    }
  }

  const generateQuote = async () => {
    console.log("clicked");
    try {
      //   setLoading(true);
      const result = await getData();
      setQuote(result);
      setError(null);
      console.log("Handle submit:", result);
    } catch (error: any) {
      console.error("Error posting data:", error);
      setError("Something went wrong");
    } finally {
      //   setLoading(false);
    }
  };

  const saveQuote = async () => {
    console.log("clicked", quote);

    const result = await saveData(quote);
  };

  function openModal() {
    setIsOpen(true);
    generateQuote();
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-100">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-[10%]"
        >
          {text}
        </button>
      </div>

      {quote && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {/* <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Payment successful
                    </Dialog.Title> */}
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{quote[0].quote}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Author: {quote[0].author}
                      </p>
                    </div>

                    <div className="mt-4">
                      {/* <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Get another Quote
                    </button> */}
                      <button
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={generateQuote}
                      >
                        Get another Quote
                      </button>
                      <button
                        className="ml-5"
                        type="button"
                        onClick={saveQuote}
                      >
                        <FaHeart color="red" />
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
