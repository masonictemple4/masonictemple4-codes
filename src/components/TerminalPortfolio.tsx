'use client';

import { useEffect, useRef, useState } from "react";

// Type definitions
interface FormattedContent {
  title: string;
  sections: Array<{
    heading: string;
    items: string[];
  }>;
}

interface CommandOutput {
  type: 'text' | 'formatted' | 'error' | 'clear';
  content: string | FormattedContent;
}

interface HistoryEntry {
  command: string;
  output: CommandOutput;
  timestamp: Date;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDelay: number;
  duration: number;
}

type Commands = {
  [key: string]: () => CommandOutput;
};

const TerminalPortfolio = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Available commands
  const commands: Commands = {
    help: (): CommandOutput => ({
      type: 'text',
      content: `Available commands:
  help      - Show this help message
  whoami    - Who am I?
  about     - Learn about me
  resume    - View my resume
  portfolio - See my projects
  contact   - Get my contact information
  skills    - List my technical skills
  clear     - Clear the terminal
  ls        - List available sections
  cat <section> - Display content of a section`
    }),

    whoami: (): CommandOutput => ({
      type: 'text',
      content: `Mason Tucker | Software Engineer

7+ years of experience in high-risk, fast-paced startup environments.
Proven track record developing scalable backend systems and applications.
Passionate about Go, Python, and building products from the ground up.

Type 'about' for more details or 'help' to see what else I can tell you!`
    }),

    about: (): CommandOutput => ({
      type: 'text',
      content: `Hello! I'm Mason Tucker, a Software Engineer with 7+ years of experience 
in high-risk, fast-paced startup environments.

I specialize in developing and deploying backend systems and applications with a 
focus on scalability, reliability, and performance. I've been a founding engineer 
at multiple startups, taking products from conception to launch.

Currently looking for additional challenges in startups, big tech, contract work, 
and both greenfield and legacy projects.

Awards include the 2023 SWFL Inc Innovation Award, 2018 Florida Governor's Cup 
1st Place Best Startup, and 2017 Google Startup Weekend.

Welcome to my terminal-style portfolio!`
    }),

    resume: (): CommandOutput => ({
      type: 'formatted',
      content: {
        title: 'Mason Tucker - Software Engineer',
        sections: [
          {
            heading: 'Experience',
            items: [
              'Listella - Founding/Backend Software Engineer (2021-2025)',
              ' Built zero-commission real estate platform backend from scratch',
              ' Developed in-house REST framework in Go + gRPC macro services',
              ' Core services: listings, payments, messaging, LLM integration, AUTH/RBAC',
              '',
              'Roomdig - Founding/Software Engineer (2017-2021)',
              ' Designed complete technical stack for college housing marketplace',
              ' Built Python Django monolith + iOS app rewrite in Swift 4',
              ' Features: payments, matching algorithms, real-time messaging',
              '',
              'RobinTek - Web Developer Intern (2013-2014)',
              'Micro Center - Technical Support (2016-2017)'
            ]
          },
          {
            heading: 'Education',
            items: [
              'Florida Gulf Coast University (2019) - Runway Program, CEO Club',
              'Columbus State Community College (2015-2017)',
              'Ohio University (2014-2015)',
              'Olentangy Orange High School (2014)'
            ]
          },
          {
            heading: 'Awards',
            items: [
              '2023 SWFL Inc Innovation Award',
              '2018 Florida Governor\'s Cup 1st Place Best Startup',
              '2018 Proclamation from City of Estero, Florida',
              '2017 Google Startup Weekend'
            ]
          }
        ]
      }
    }),

    portfolio: (): CommandOutput => ({
      type: 'formatted',
      content: {
        title: 'Portfolio Projects',
        sections: [
          {
            heading: 'Listella (2021-2025)',
            items: [
              'Zero-commission real estate platform - Co-founder/Backend Engineer',
              'Built entire backend from scratch using Go REST framework',
              'Technologies: Go, gRPC, PostgreSQL, Redis, Docker, GCP Cloud Run',
              'Features: listing workflow, image processing, payments, real-time messaging',
              'LLM integration, task queues, PDF processing, AUTH/RBAC middleware'
            ]
          },
          {
            heading: 'Roomdig (2017-2021)',
            items: [
              'College housing & roommate marketplace - Founding Engineer',
              'Full technical stack design and implementation',
              'Python Django REST + iOS Swift 4 app + Angular web platform',
              'Features: student verification, matching algorithms, payments, messaging',
              'Technologies: Python, Django, Swift, Angular, MySQL, GCP, Firebase'
            ]
          },
          {
            heading: 'Other Projects',
            items: [
              'Terminal Portfolio - React/Angular implementations',
              'Various open source contributions - github.com/masonictemple4',
              'Personal website - masonictemple4.codes'
            ]
          }
        ]
      }
    }),

    contact: (): CommandOutput => ({
      type: 'text',
      content: `Contact Information:
  Email: Masonictemple4codes@gmail.com
  Phone: (239) 919-6070
  Location: Columbus, Ohio, 43035
  GitHub: github.com/masonictemple4
  Website: masonictemple4.codes`
    }),

    skills: (): CommandOutput => ({
      type: 'formatted',
      content: {
        title: 'Technical Skills',
        sections: [
          {
            heading: 'Backend & Languages',
            items: [
              'Go (Golang) - Primary backend language',
              'Python - Django, REST Framework',
              'TypeScript/JavaScript',
              'C/C++',
              'Swift 4'
            ]
          },
          {
            heading: 'Frontend & Mobile',
            items: [
              'Angular - Full web applications',
              'React & Next.js',
              'iOS Development (Swift)',
              'HTML/CSS, Bootstrap, Tailwind CSS',
              'WordPress development'
            ]
          },
          {
            heading: 'Infrastructure & Tools',
            items: [
              'GCP (Cloud Run, Functions, Storage, BigQuery, etc.)',
              'Docker & Containerization',
              'PostgreSQL, MySQL, Redis, Memcached',
              'gRPC, WebSockets, HTTP/2',
              'CI/CD, Git, Swagger/OpenAPI',
              'OAuth, Microservices, ORMs'
            ]
          },
          {
            heading: 'Specialized',
            items: [
              'OpenCV - Image processing',
              'LLM Integration',
              'Payment Systems (Stripe)',
              'Real-time messaging systems',
              'PDF processing',
              'Task queues & scheduling'
            ]
          }
        ]
      }
    }),

    ls: (): CommandOutput => ({
      type: 'text',
      content: `total 7
drwxr-xr-x 2 user user 4096 Jun  2 2025 about
drwxr-xr-x 2 user user 4096 Jun  2 2025 resume
drwxr-xr-x 2 user user 4096 Jun  2 2025 portfolio
drwxr-xr-x 2 user user 4096 Jun  2 2025 contact
drwxr-xr-x 2 user user 4096 Jun  2 2025 skills
-rw-r--r-- 1 user user  256 Jun  2 2025 whoami
-rw-r--r-- 1 user user  128 Jun  2 2025 README.md`
    }),

    clear: (): CommandOutput => ({ type: 'clear', content: '' })
  };

  // Handle cat command with argument
  const handleCatCommand = (args: string[]): CommandOutput => {
    const section = args[0];
    if (!section) {
      return {
        type: 'error',
        content: 'cat: missing operand\nTry \'help\' for more information.'
      };
    }
    
    const commandFn = commands[section];
    if (commandFn && section !== 'clear' && section !== 'ls') {
      return commandFn();
    }
    
    return {
      type: 'error',
      content: `cat: ${section}: No such file or directory`
    };
  };

  const processCommand = (input: string): CommandOutput | null => {
    const trimmed = input.trim().toLowerCase();
    const [command, ...args] = trimmed.split(' ');
    
    if (!command) return null;
    
    if (command === 'cat') {
      return handleCatCommand(args);
    }
    
    const commandFn = commands[command];
    if (commandFn) {
      return commandFn();
    }
    
    return {
      type: 'error',
      content: `Command not found: ${command}\nType 'help' for available commands.`
    };
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (!currentInput.trim()) return;
      
      const output = processCommand(currentInput);
      
      if (!output) return;
      
      // Add command to history
      const newEntry: HistoryEntry = {
        command: currentInput,
        output: output,
        timestamp: new Date()
      };
      
      if (output.type === 'clear') {
        setHistory([]);
      } else {
        setHistory(prev => [...prev, newEntry]);
      }
      
      // Update command history for navigation
      setCommandHistory(prev => [...prev, currentInput]);
      setCurrentInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Initialize with help command on mount
  useEffect(() => {
    // Display initial help command
    const helpOutput = commands.help();
    const initialEntry: HistoryEntry = {
      command: 'help',
      output: helpOutput,
      timestamp: new Date()
    };
    
    setHistory([initialEntry]);
    
    // Focus input after component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTerminalClick = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderOutput = (output: CommandOutput) => {
    if (!output) return null;
    
    switch (output.type) {
      case 'text':
        return <pre className="whitespace-pre-wrap">{output.content as string}</pre>;
      
      case 'formatted':
        const formattedContent = output.content as FormattedContent;
        return (
          <div>
            <h3 className="text-green-400 font-bold mb-2">{formattedContent.title}</h3>
            {formattedContent.sections.map((section, idx) => (
              <div key={idx} className="mb-3">
                <h4 className="text-blue-400 font-semibold">{section.heading}:</h4>
                <ul className="ml-4">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-300">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      
      case 'error':
        return <pre className="text-red-400 whitespace-pre-wrap">{output.content as string}</pre>;
      
      default:
        return <pre className="whitespace-pre-wrap">{output.content as string}</pre>;
    }
  };

  // Generate random stars for the background
  const generateStars = (): Star[] => {
    const stars: Star[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        animationDelay: Math.random() * 4,
        duration: Math.random() * 3 + 2
      });
    }
    return stars;
  };

  const [stars, setStars] = useState<Star[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Generate stars only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setStars(generateStars());
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Space Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        {/* Stars - only render on client */}
        {isClient && stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
        
        {/* Floating particles - only render on client */}
        <div className="absolute inset-0">
          {isClient && Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle nebula effect */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Terminal Content */}
      <div className="relative z-10 min-h-screen text-green-400 font-mono">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">Mason Tucker - masonictemple4.codes</h1>
            <p className="text-gray-300 drop-shadow">Software Engineer. Available commands are shown below.</p>
          </div>
          
          <div 
            ref={terminalRef}
            className="bg-black/80 backdrop-blur-sm rounded-lg p-4 h-96 overflow-y-auto cursor-text border border-green-500/20 shadow-2xl shadow-green-500/10"
            onClick={handleTerminalClick}
          >
            {/* Command History */}
            {history.map((entry, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <span className="text-cyan-400">user@masonictemple4:~$</span>
                  <span className="ml-2 text-green-300">{entry.command}</span>
                </div>
                <div className="mt-1 ml-4">
                  {renderOutput(entry.output)}
                </div>
              </div>
            ))}
            
            {/* Current Input */}
            <div className="flex items-center">
              <span className="text-cyan-400">user@masonictemple4:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  } else {
                    handleKeyDown(e);
                  }
                }}
                className="ml-2 bg-transparent outline-none flex-1 text-green-400 caret-green-400"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <p>Use ↑↓ arrows to navigate command history • Click anywhere to focus terminal</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default TerminalPortfolio;
