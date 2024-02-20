"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";

type MyCardI = {
  heading: string;
  count: number;
};

type analysisDataI = {
  character: number;
  word: number;
  sentence: number;
  digit: number;
  vowel: number;
  consonant: number;
};

export default function Home() {
  const ref = useRef(null);
  const [para, setPara] = useState<string>("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initData: analysisDataI = {
    character: 0,
    word: 0,
    sentence: 0,
    digit: 0,
    vowel: 0,
    consonant: 0,
  };
  const [analysisData, setAnalysisData] = useState<analysisDataI | null>();

  const methods = {
    anslysis: () => {
      if (!para) {
        toast({
          title: "Please enter something...",
        });
        return;
      }
      setIsLoading(true);
      let tobj: analysisDataI = { ...initData };
      const str: string = para
        .trim()
        .split(" ")
        .filter((s) => s)
        .join(" ");
      tobj.word = str.split(" ").length;
      for (let i = 0; i < str.length; i++) {
        const val = str.charCodeAt(i);
        console.log(val);
        if (
          (val >= "A".charCodeAt(0) && val <= "Z".charCodeAt(0)) ||
          (val >= "a".charCodeAt(0) && val <= "z".charCodeAt(0))
        ) {
          tobj.character++;
          const ch = str.charAt(i);
          if (
            ch === "a" ||
            ch === "e" ||
            ch === "i" ||
            ch === "o" ||
            ch === "u" ||
            ch === "A" ||
            ch === "E" ||
            ch === "I" ||
            ch === "O" ||
            ch === "U"
          ) {
            tobj.vowel++;
          } else {
            tobj.consonant++;
          }
        } else if (val >= "0".charCodeAt(0) && val <= "9".charCodeAt(0)) {
          tobj.digit++;
        } else if (val === ".".charCodeAt(0) || val === '\n'.charCodeAt(0)) {
          tobj.sentence++;
        }
      }

      console.log(tobj);

      setTimeout(() => {
        setAnalysisData({ ...tobj });
        setIsLoading(false);
        toast({
          title: "Text analysis success...",
        });
      }, 2000);
    },
    upperCase: () => {
      if (!para) {
        toast({
          title: "Please enter something...",
        });
        return;
      }
      setPara((s) => s.toUpperCase());
      toast({
        title: "Text converted to uppercase...",
      });
    },
    lowerCase: () => {
      if (!para) {
        toast({
          title: "Please enter something...",
        });
        return;
      }
      setPara((s) => s.toLowerCase());
      toast({
        title: "Text converted to lowercase...",
      });
    },
    formatText: () => {
      if (!para) {
        toast({
          title: "Please enter something...",
        });
        return;
      }
      console.log(para.split(" "));
      setPara((s) =>
        s
          .split(" ")
          .filter((s) => s)
          .join(" ")
      );
      toast({
        title: "Text formatted...",
      });
    },
    copyText: () => {
      if (!para) {
        toast({
          title: "Please enter something...",
        });
        return;
      }
      try {
        navigator.clipboard.writeText(para);
      } catch (error) {
        
      }
      toast({
        title: "Text copied...",
      });
    },
    clearText: () => {
      if(analysisData) setAnalysisData(null);
      if (!para) {
        toast({
          title: "Nothing to clear...",
        });
        return;
      }
      setPara("");
      toast({
        title: "Text has cleared...",
      });
    },
  };

  return (
    <>
      <main className="max-w-[1440px] w-[90%] mx-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-4 md:my-5 text-center">
          Text Anslysis Toolbox
        </h1>
        <div className="">
          <Textarea
            className="h-[8rem] md:h-[11rem] resize-none text-xl"
            placeholder="Write text here..."
            ref={ref}
            value={para}
            onChange={(e) => {
              if(analysisData) setAnalysisData(null);
              setPara(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 py-6">
          <Button className="uppercase" onClick={methods.anslysis}>
            Analyze
          </Button>
          <Button className="uppercase" onClick={methods.upperCase}>
            Uppercase
          </Button>
          <Button className="uppercase" onClick={methods.lowerCase}>
            Lowercase
          </Button>
          <Button className="uppercase" onClick={methods.formatText}>
            Format Text
          </Button>
          <Button className="uppercase" onClick={methods.copyText}>
            Copy Text
          </Button>
          <Button className="uppercase" onClick={methods.clearText}>
            Clear Text
          </Button>
        </div>
        <div>
          {isLoading && <Spinner />}
          {!isLoading && analysisData && (
            <div className="flex justify-center items-center gap-8 flex-wrap py-8">
              <MyCard heading={'character'} count={analysisData.character} />
              <MyCard heading={'word'} count={analysisData.word} />
              <MyCard heading={'sentence'} count={analysisData.sentence} />
              <MyCard heading={'digit'} count={analysisData.digit} />
              <MyCard heading={'vowel'} count={analysisData.vowel} />
              <MyCard heading={'consonant'} count={analysisData.consonant} />
            </div>
          )}
        </div>
        <footer className="text-center py-5">&#169; alokpaul</footer>
      </main>

      <Toaster />
    </>
  );
}

const MyCard = ({ heading, count }: MyCardI) => (
  <Card className="w-[15rem]">
    <CardHeader className="uppercase text-center text-xl font-bold">{heading}</CardHeader>
    <CardDescription className=" text-center pb-5 text-4xl">{count}</CardDescription>
  </Card>
);

const Spinner = () => (
  <div role="status" className="flex justify-center items-center py-10">
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);
