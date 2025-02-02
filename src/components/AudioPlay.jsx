import React, { useEffect, useRef, useState } from "react";
import { audioClips } from "../AUDIO_CLIPS";
import { Loader, Mic, MicOff } from "lucide-react";

const AudioPlay = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("جهازك لا يدعم التعرف على الكلام هل يمكنك استخدام جهاز اخر");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "ar-SA";

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
    };

    recognitionRef.current.onresult = event => {
      const transcript = event.results[0][0].transcript.trim();
      setRecognizedText(transcript);
      setIsRecording(false);
      setIsLoading(true);

      const audioFile = audioClips[transcript];
      if (audioFile) {
        audioRef.current.src = audioFile;
        audioRef.current
          .play()
          .then(() => {
            setIsLoading(false);
          })
          .catch(error => {
            console.error("Error playing audio:", error);
            setIsLoading(false);
            alert("حدث خطأ في تشغيل الصوت");
          });
      } else {
        setIsLoading(false);
        alert(`لم يتم العثور على مقطع صوتي لـ: ${transcript}`);
      }
    };

    recognitionRef.current.onerror = event => {
      console.error("خطأ في التعرف على الكلام", event.error);
      setIsRecording(false);
      setIsLoading(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecognition = () => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsRecording(false);
      setIsLoading(false);
    }
  };

  const stopRecognition = () => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } catch (error) {
      console.error("Error stopping recognition:", error);
    }
    setIsRecording(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <button
        onClick={isRecording ? stopRecognition : startRecognition}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          margin: "20px",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "50%",
          width: "90px",
          height: "90px",
          backgroundColor: isRecording ? "#ff4444" : "#f0f0f0",
          transition: "background-color 0.3s ease"
        }}
      >
        {isRecording
          ? <Mic size={24} color="white" />
          : isLoading
            ? <Loader size={24} />
            : <MicOff size={24} color="green" />}
      </button>

      {recognizedText &&
        <p style={{ fontSize: "16px", marginRight: "5px" }}>
          تشغيل: {recognizedText}
          {isLoading &&
            <Loader
              size={20}
              style={{
                marginLeft: "5px",
                display: "inline-block"
              }}
            />}
        </p>}
      {!recognizedText && <p style={{ fontSize: "16px" }}>لايوجد محتوى</p>}
      <audio
        ref={audioRef}
        controls
        style={{
          marginTop: "20px",
          opacity: isLoading ? 0.7 : 1
        }}
      />
    </div>
  );
};

export default AudioPlay;
