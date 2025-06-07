import { GoogleReCaptchaCheckbox } from "@google-recaptcha/react";
import { useEffect, useState } from "react";

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
}

export function ReCaptcha({ onVerify }: ReCaptchaProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <GoogleReCaptchaCheckbox onChange={onVerify} theme="light" />;
}
