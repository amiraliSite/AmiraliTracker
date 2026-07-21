import { useEffect, useState } from 'react'
import type { Transaction } from './Transactions'
import { BiXCircle, BiMoon, BiSun, BiTrendingUp, BiTrendingDown, BiUser } from 'react-icons/bi'

import img from './assets/qedfe.jpg'

function ExpernsTaseir() {
  // تم پیش‌فرض روشن (false یعنی لایت مود)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  const [transaction, settransaction] = useState<Transaction[]>(() => {
    const savedtran = localStorage.getItem('transaction')
    return savedtran ? JSON.parse(savedtran) : []
  })

  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    localStorage.setItem('transaction', JSON.stringify(transaction))
  }, [transaction])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addTransaction = () => {
    if (!text || !amount) return
    const newTranaction: Transaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount)
    }

    settransaction([newTranaction, ...transaction])
    setText('')
    setAmount('')
  }

  const deleteTransaction = (id: number) => {
    settransaction(transaction.filter((item) => item.id != id))
  }

  let total = 0
  transaction.map((item) => total += item.amount)

  let income = 0
  let experns = 0

  transaction.map((item) => {
    if (item.amount > 0) {
      income += item.amount
    } else {
      experns += item.amount
    }
  })

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-all duration-500 p-4 font-sans relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900' 
        : 'bg-gradient-to-br from-rose-100 via-orange-50 to-amber-50'
    }`}>
      
      {/* پس‌زمینه متحرک و نرم */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${
          darkMode ? 'bg-purple-700' : 'bg-rose-300'
        }`}></div>
        <div className={`absolute top-10 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${
          darkMode ? 'bg-blue-700' : 'bg-orange-300'
        }`}></div>
        <div className={`absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 ${
          darkMode ? 'bg-pink-700' : 'bg-yellow-300'
        }`}></div>
      </div>

      {/* دکمه تغییر تم - بیرون از کادر اصلی */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 active:scale-95 border-2 ${
          darkMode 
            ? 'bg-slate-800 border-yellow-400 text-yellow-400 shadow-yellow-500/20' 
            : 'bg-white border-orange-400 text-orange-500 shadow-orange-500/20'
        }`}
        title={darkMode ? 'حالت روز' : 'حالت شب'}
      >
        {darkMode ? <BiSun size={28} /> : <BiMoon size={28} />}
      </button>

      {/* کادر اصلی - کوچکتر و جمع‌وجور */}
      <div className="relative w-full max-w-sm z-10">
        
        <div className={`backdrop-blur-xl border-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
          darkMode 
            ? 'bg-slate-900/80 border-purple-500/30 shadow-purple-900/50' 
            : 'bg-white/80 border-orange-200 shadow-orange-200/50'
        }`}>
          
          {/* هدر */}
          <div className={`p-6 text-center border-b-2 relative overflow-hidden ${
            darkMode 
              ? 'border-purple-500/20 bg-gradient-to-b from-purple-900/20 to-transparent' 
              : 'border-orange-100 bg-gradient-to-b from-orange-50/50 to-transparent'
          }`}>
            
            <h2 className={`text-3xl font-black mb-1 tracking-tight ${
              darkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600'
            }`}>
              Amirali Tracker
            </h2>
            
            <div className={`mt-4 inline-block px-6 py-3 rounded-2xl shadow-inner ${
              darkMode ? 'bg-slate-800' : 'bg-white'
            }`}>
              <span className={`text-xs uppercase tracking-widest block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Balance</span>
              <h3 className={`text-4xl font-black ${
                total >= 0 
                  ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  : darkMode ? 'text-rose-400' : 'text-rose-600'
              }`}>
                ${total.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* بخش درآمد و هزینه */}
          <div className="grid grid-cols-2 gap-3 p-4">
            <div className={`p-3 rounded-2xl text-center border transition-all hover:-translate-y-1 ${
              darkMode 
                ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-600'
            }`}>
              <BiTrendingUp className="mx-auto mb-1" size={20} />
              <span className="text-xs font-bold block opacity-80">Income</span>
              <span className="font-black text-lg">+${income.toLocaleString()}</span>
            </div>
            <div className={`p-3 rounded-2xl text-center border transition-all hover:-translate-y-1 ${
              darkMode 
                ? 'bg-rose-900/20 border-rose-500/30 text-rose-400' 
                : 'bg-rose-50 border-rose-200 text-rose-600'
            }`}>
              <BiTrendingDown className="mx-auto mb-1" size={20} />
              <span className="text-xs font-bold block opacity-80">Expense</span>
              <span className="font-black text-lg">-${Math.abs(experns).toLocaleString()}</span>
            </div>
          </div>

          {/* فرم افزودن */}
          <div className="px-4 pb-4 space-y-3">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all focus:scale-[1.02] outline-none border-2 ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                  : 'bg-white border-orange-100 text-gray-800 placeholder-orange-300 focus:border-orange-400'
              }`}
              placeholder='Description...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="number"
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all focus:scale-[1.02] outline-none border-2 ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                    : 'bg-white border-orange-100 text-gray-800 placeholder-orange-300 focus:border-orange-400'
                }`}
                placeholder='Amount...'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={addTransaction}
                className={`px-5 py-3 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-lg ${
                  darkMode 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50' 
                    : 'bg-orange-500 hover:bg-orange-400 text-white shadow-orange-500/30'
                }`}
              >
                Add
              </button>
            </div>
          </div>

          {/* لیست تراکنش‌ها */}
          <div className="max-h-60 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar">
            {transaction.length === 0 && (
              <div className="text-center py-6 opacity-50 text-sm italic">
                No transactions yet...
              </div>
            )}
            {transaction.map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-center p-3 rounded-xl border-l-4 transition-all hover:scale-[1.02] ${
                  item.amount > 0
                    ? darkMode 
                      ? 'bg-slate-800/50 border-emerald-500 text-emerald-400' 
                      : 'bg-white border-emerald-400 text-emerald-700'
                    : darkMode 
                      ? 'bg-slate-800/50 border-rose-500 text-rose-400' 
                      : 'bg-white border-rose-400 text-rose-700'
                }`}
              >
                <div className="flex flex-col overflow-hidden">
                  <span className={`font-bold text-sm truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.text}</span>
                  <span className="text-xs font-black">{item.amount > 0 ? '+' : ''}{item.amount}</span>
                </div>
                <button
                  onClick={() => deleteTransaction(item.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    darkMode ? 'hover:bg-rose-900/50 text-gray-500 hover:text-rose-400' : 'hover:bg-rose-50 text-gray-400 hover:text-rose-500'
                  }`}
                >
                  <BiXCircle size={20} />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* فوتر: ساخته شده توسط امیرعلی محمدی */}
        <div className="mt-6 flex flex-col items-center justify-center animate-fade-in-up">
          <div className="relative group cursor-pointer">
            <div className={`absolute inset-0 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity ${
              darkMode ? 'bg-purple-500' : 'bg-orange-400'
            }`}></div>
            {/* عکس پروفایل پیش‌فرض */}
            <img 
              src={img} 
              alt="Amirali Mohammadi" 
              className={`relative animate-bounce w-36 h-36 rounded-full border-4 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 ${
                darkMode ? 'border-slate-800 bg-slate-700' : 'border-white bg-white'
              }`}
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              darkMode ? 'bg-green-500 border-slate-900' : 'bg-green-500 border-white'
            }`}>
              <BiUser size={10} className="text-white" />
            </div>
          </div>
          <a href='https://amirresume.netlify.app' target='_blank' className={`mt-2 text-xl font-bold tracking-wider uppercase opacity-70 ${
            darkMode ? 'text-purple-300' : 'text-orange-800'
          }`}>
            Created  Amirali Mohammadi
          </a>
        </div>

      </div>
    </div>
  )
}

export default ExpernsTaseir