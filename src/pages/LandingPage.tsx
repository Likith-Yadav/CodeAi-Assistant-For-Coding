import React, { useState } from 'react';
import { Code2, Sparkles, Shield, Cpu, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Add these constants at the top of the file
const cardBg = "bg-gray-950/50";
const borderColor = "border-gray-800/50";
const hoverBorderColor = "hover:border-blue-600/50";

const codeExamples = {
  generate: {
    title: "AI Code Generation",
    code: `// Example: Generate a React component
const prompt = "Create a responsive navbar";

const response = await AI.generateCode(prompt);

// Result:
function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <Navigation />
      <MobileMenu />
    </nav>
  );
}`
  },
  suggest: {
    title: "Smart Suggestions",
    code: `// Example: Get code suggestions
const code = "function calculateTotal(items) {";

const suggestions = await AI.getSuggestions(code);

// Result:
function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}`
  },
  debug: {
    title: "Code Debugging",
    code: `// Example: Debug code issues
const buggyCode = \`
function sortArray(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length; j++) {
      if(arr[i] < arr[j]) {
        arr[i] = arr[j];
      }
    }
  }
}\`;

const debug = await AI.debugCode(buggyCode);

// Fixed version:
function sortArray(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length; j++) {
      if(arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
}`
  }
};

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState<'generate' | 'suggest' | 'debug'>('generate');

  return (
    <div className="min-h-screen gradient-bg text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full"></div>
              <div className="relative bg-blue-500 p-4 rounded-2xl shadow-lg">
                <Code2 className="w-12 h-12" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
            AI-Powered Code Assistant
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Transform your coding experience with advanced AI. Generate code, get suggestions,
            and debug faster than ever before.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              to="/login"
              className="px-8 py-4 bg-blue-500 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-transparent border border-blue-500 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Cpu}
            title="AI Code Generation"
            description="Generate high-quality code snippets and complete components with advanced AI technology."
            onHover={() => setActiveFeature('generate')}
            active={activeFeature === 'generate'}
          />
          <FeatureCard
            icon={Sparkles}
            title="Smart Suggestions"
            description="Get intelligent recommendations for your coding ideas and implementation strategies."
            onHover={() => setActiveFeature('suggest')}
            active={activeFeature === 'suggest'}
          />
          <FeatureCard
            icon={Shield}
            title="Code Debugging"
            description="Identify and fix bugs quickly with AI-powered code analysis and solutions."
            onHover={() => setActiveFeature('debug')}
            active={activeFeature === 'debug'}
          />
        </div>
      </div>

      {/* Code Demo Section */}
      <div className="container mx-auto px-4 py-24">
        <div className={`${cardBg} rounded-2xl p-8 backdrop-blur-xl border ${borderColor} transition-all duration-500 shadow-2xl shadow-blue-500/5`}>
          <div className="flex items-center mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400">
              {codeExamples[activeFeature].title}
            </div>
          </div>
          <pre className="text-sm md:text-base overflow-x-auto transition-all duration-500">
            <code className="language-typescript text-gray-300">
              {codeExamples[activeFeature].code}
            </code>
          </pre>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-8 rounded-2xl ${cardBg} backdrop-blur-xl border ${borderColor} ${hoverBorderColor} transition-all duration-300 group text-center shadow-2xl shadow-blue-500/5`}>
            <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              100+
            </div>
            <div className="text-gray-400 text-lg">Programming Languages</div>
            <div className="mt-3 text-sm text-gray-500">From Python to Rust</div>
          </div>
          <div className={`p-8 rounded-2xl ${cardBg} backdrop-blur-xl border ${borderColor} ${hoverBorderColor} transition-all duration-300 group text-center shadow-2xl shadow-blue-500/5`}>
            <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              50ms
            </div>
            <div className="text-gray-400 text-lg">Response Time</div>
            <div className="mt-3 text-sm text-gray-500">Lightning-fast AI processing</div>
          </div>
          <div className={`p-8 rounded-2xl ${cardBg} backdrop-blur-xl border ${borderColor} ${hoverBorderColor} transition-all duration-300 group text-center shadow-2xl shadow-blue-500/5`}>
            <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              24/7
            </div>
            <div className="text-gray-400 text-lg">AI Availability</div>
            <div className="mt-3 text-sm text-gray-500">Always ready to assist</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl bg-gray-950/70 backdrop-blur-xl border border-gray-800/50 relative overflow-hidden shadow-2xl shadow-blue-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Ready to Transform Your Coding?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using AI to write better code, faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-blue-500 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 group"
              >
                Start Coding with AI
                <Zap className="ml-2 w-5 h-5 group-hover:animate-pulse" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-transparent border border-blue-500 rounded-xl font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105"
              >
                Existing User? Login
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onHover: () => void;
  active: boolean;
}

function FeatureCard({ icon: Icon, title, description, onHover, active }: FeatureCardProps) {
  return (
    <div
      className={`p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 group cursor-pointer
        ${active 
          ? 'bg-gray-950/80 border-blue-600/50 transform scale-105 shadow-2xl shadow-blue-500/10' 
          : 'bg-gray-950/50 border-gray-800/50 hover:border-blue-600/50'
        }`}
      onMouseEnter={onHover}
    >
      <div className="bg-blue-600/20 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-blue-100">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}