// src/components/KeyboardMapper.tsx


import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const KeyboardMapper = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [lastKey, setLastKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Arial');

  const fonts = [
    'Arial',
    'Traditional Arabic',
    'Simplified Arabic',
    'Amiri',
    'Scheherazade',
    'Noto Naskh Arabic',
  ];

  const mappings: Record<string, string> = {
    // Letters
    a: 'ا',
    b: 'ب',
    c: 'ش',
    d: 'د',
    e: 'ى',
    f: 'ف',
    g: 'ع',
    h: 'ه',
    i: 'إ',
    j: 'ج',
    k: 'ك',
    l: 'ل',
    m: 'م',
    n: 'ن',
    o: 'ؤ',
    p: 'ب',
    q: 'ق',
    r: 'ر',
    s: 'س',
    t: 'ت',
    u: 'ئ',
    v: 'ڤ',
    w: 'و',
    x: 'اكس',
    y: 'ي',
    z: 'ز',
    // Special characters
    A: 'أ',
    D: 'ض',
    T: 'ط',
    "d'": 'ذ',
    '7': 'ح',
    kh: 'خ',
    '5': 'خ',
    th: 'ث',
    gh: 'غ',
    é: 'ء',
    "a'": 'آ',
    "t'": 'ة',
    
  };

  const handleKeyClick = (key: string) => {
    setInputText((prev) => prev + key);
    setLastKey(key);
    setShowKey(true);
    setTimeout(() => setShowKey(false), 300);
  };

  const convertToArabic = (text: string): string => {
    let result = text;
    const combos = ["d'", "a'", "t'", 'kh', 'th', 'gh'];
    combos.forEach((combo) => {
      result = result.replace(new RegExp(combo, 'g'), mappings[combo]);
    });
    Object.entries(mappings).forEach(([eng, ar]) => {
      if (eng.length === 1) {
        result = result.replace(new RegExp(eng, 'g'), ar);
      }
    });
    return result;
  };

  useEffect(() => {
    setOutputText(convertToArabic(inputText));
  }, [inputText]);

  const KeyboardLayout = () => {
    const rows = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ];

    return (
      <div className=" bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-end">
         
        </div>
     
            {rows.map((row, i) => (
              <div key={i} className="flex justify-center gap-1 mb-1">
                {row.map((key) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => handleKeyClick(key)}
                    className={`border rounded p-2 w-12 h-12 flex flex-col items-center justify-center
                      ${lastKey === key && showKey ? 'bg-blue-100' : 'bg-white'}`}
                  >
                    <div className="text-sm">{key}</div>
                    <div className="text-lg">{mappings[key]}</div>
                  </button>
                ))}
              </div>
            ))}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {["7", "5", "kh", "th", "gh", "d'", "a'", "t'", "D", "T", "A", "é"].map((special) => (
                <button
                  type="button"
                  key={special}
                  onClick={() => handleKeyClick(special)}
                  className="border rounded p-2 text-center min-w-[3rem]"
                >
                  <div className="text-sm">{special}</div>
                  <div className="text-lg">{mappings[special]}</div>
                </button>
              ))}
            </div>
      
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex justify-center items-center">
          <span>Arabic Keyboard Mapper</span>
          
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
            <input
            type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 border rounded font-mono"
              dir="ltr"
              placeholder="Type using your English keyboard..."
            />
            <input
            type="text"
              value={outputText}
              readOnly
              className="w-full p-2 border rounded bg-gray-50 text-lg"
              dir="rtl"
              style={{ fontFamily: selectedFont }}
            />
        </div>
      </CardContent>
      <KeyboardLayout />
    </Card>
  );
};

export default KeyboardMapper;