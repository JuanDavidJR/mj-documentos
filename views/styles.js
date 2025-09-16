// views/styles.js

function getFormCSS() {
  return `
    * { box-sizing: border-box; }
    
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      margin: 0; padding: 0; background: #0f0f0f; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
    }
    
    body::before {
      content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at 20% 50%, rgba(0, 255, 68, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(0, 255, 68, 0.05) 0%, transparent 50%);
      pointer-events: none; z-index: -1;
    }
    
    .container {
      max-width: 700px; width: 100%; margin: 20px;
      background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.95) 100%);
      backdrop-filter: blur(20px); border: 1px solid rgba(0, 255, 68, 0.2);
      padding: 40px; border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 255, 68, 0.1);
    }
    
    .header { 
      text-align: center; 
      margin-bottom: 40px; 
      position: relative; 
      min-height: 60px;
    }
    
    .back-btn {
      position: absolute; 
      left: 0; 
      top: 5px;
      color: #00ff44; 
      text-decoration: none; 
      font-weight: 500;
      transition: color 0.3s;
      z-index: 100;
      cursor: pointer;
      padding: 5px 10px;
      background: rgba(0, 255, 68, 0.1);
      border-radius: 5px;
    }
    
    .back-btn:hover { color: #00cc36; }
    
    h1 { 
      color: #ffffff; margin: 0 0 10px 0; font-size: 24px;
      font-weight: 300; letter-spacing: 2px; position: relative;
    }
    
    .subtitle { color: #00ff44; font-size: 14px; font-weight: 500; letter-spacing: 1px; }
    
    h1::after {
      content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
      width: 60px; height: 2px; background: linear-gradient(90deg, #00ff44, #00cc36); border-radius: 2px;
    }
    
    form { display: flex; flex-direction: column; }
    
    .form-group { margin-bottom: 24px; }
    
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    
    label {
      display: block; margin-bottom: 8px; font-weight: 500; color: #e0e0e0;
      font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase;
    }
    
    input, textarea { 
      width: 100%; padding: 16px; border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px; font-size: 15px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.05); color: #ffffff;
      backdrop-filter: blur(10px); font-family: inherit;
    }
    
    select {
      width: 100%; padding: 16px; border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px; font-size: 15px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: #2a2a2a; color: #ffffff;
      font-family: inherit; cursor: pointer;
    }
    
    select option {
      background: #2a2a2a; color: #ffffff; padding: 10px;
    }
    
    input::placeholder, textarea::placeholder { color: rgba(255, 255, 255, 0.5); }
    
    input:focus, textarea:focus, select:focus {
      outline: none; border-color: #00ff44; background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 3px rgba(0, 255, 68, 0.1); transform: translateY(-1px);
    }
    
    textarea { resize: vertical; min-height: 100px; font-family: inherit; }
    
    button { 
      padding: 18px 32px; background: linear-gradient(135deg, #00ff44 0%, #00cc36 100%);
      color: #000000; border: none; border-radius: 8px; cursor: pointer;
      font-size: 16px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; margin-top: 16px;
    }
    
    button::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    button:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(0, 255, 68, 0.3); }
    button:hover::before { left: 100%; }
    button:active { transform: translateY(0); }
    
    .total-preview {
      background: linear-gradient(135deg, rgba(0, 255, 68, 0.15) 0%, rgba(0, 204, 54, 0.15) 100%);
      border: 1px solid rgba(0, 255, 68, 0.3); padding: 20px; border-radius: 8px;
      margin: 24px 0; text-align: center; font-weight: 600; color: #00ff44;
      font-size: 18px; letter-spacing: 1px; backdrop-filter: blur(10px);
    }
    
    @media (max-width: 768px) {
      .container { margin: 10px; padding: 24px; }
      .row { grid-template-columns: 1fr; gap: 16px; }
    }
  `;
}

function getMainPageCSS() {
  return `
    * { box-sizing: border-box; }
    
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      margin: 0; padding: 0; background: #0f0f0f; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
    }
    
    body::before {
      content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at 20% 50%, rgba(0, 255, 68, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(0, 255, 68, 0.05) 0%, transparent 50%);
      pointer-events: none; z-index: -1;
    }
    
    .container {
      max-width: 500px; width: 100%; margin: 20px;
      background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(35, 35, 35, 0.95) 100%);
      backdrop-filter: blur(20px); border: 1px solid rgba(0, 255, 68, 0.2);
      padding: 40px; border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 255, 68, 0.1);
    }
    
    h1 { 
      text-align: center; color: #ffffff; margin-bottom: 10px; font-size: 28px;
      font-weight: 300; letter-spacing: 2px; position: relative;
    }
    
    .subtitle {
      text-align: center; color: #00ff44; font-size: 16px; font-weight: 500; 
      margin-bottom: 40px; letter-spacing: 1px;
    }
    
    h1::after {
      content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
      width: 60px; height: 2px; background: linear-gradient(90deg, #00ff44, #00cc36); border-radius: 2px;
    }
    
    .document-selector { display: grid; gap: 20px; margin-bottom: 30px; }
    
    .doc-option {
      padding: 24px; background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
      cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none; display: block;
    }
    
    .doc-option:hover {
      background: rgba(0, 255, 68, 0.1); border-color: rgba(0, 255, 68, 0.3);
      transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0, 255, 68, 0.2);
    }
    
    .doc-option h3 {
      color: #ffffff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;
    }
    
    .doc-option p {
      color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 14px; line-height: 1.5;
    }
    
    .doc-icon {
      float: right; width: 24px; height: 24px; background: #00ff44; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: #000; font-weight: bold; margin-top: -2px;
    }
  `;
}

module.exports = {
  getFormCSS,
  getMainPageCSS
};