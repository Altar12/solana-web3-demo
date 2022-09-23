"use strict";(self.webpackChunksolana_web3_demo=self.webpackChunksolana_web3_demo||[]).push([[3331],{2712:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-28dfc8d5",path:"/zh/tour/create-mint.html",title:"Create Mint",lang:"zh-TW",frontmatter:{},excerpt:"",headers:[],filePathRelative:"zh/tour/create-mint.md",git:{updatedTime:1663959362e3,contributors:[{name:"Yihau Chen",email:"a122092487@gmail.com",commits:1}]}}},1252:(n,s,a)=>{a.r(s),a.d(s,{default:()=>e});const p=(0,a(6252).uE)('<h1 id="create-mint" tabindex="-1"><a class="header-anchor" href="#create-mint" aria-hidden="true">#</a> Create Mint</h1><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Keypair<span class="token punctuation">,</span> Transaction<span class="token punctuation">,</span> SystemProgram<span class="token punctuation">,</span> Connection <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/web3.js&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  createInitializeMintInstruction<span class="token punctuation">,</span>\n  getMinimumBalanceForRentExemptMint<span class="token punctuation">,</span>\n  <span class="token constant">MINT_SIZE</span><span class="token punctuation">,</span>\n  <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/spl-token&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> bs58 <span class="token keyword">from</span> <span class="token string">&quot;bs58&quot;</span><span class="token punctuation">;</span>\n\n<span class="token comment">// connection</span>\n<span class="token keyword">const</span> connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Connection</span><span class="token punctuation">(</span><span class="token string">&quot;https://api.devnet.solana.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8</span>\n<span class="token keyword">const</span> feePayer <span class="token operator">=</span> Keypair<span class="token punctuation">.</span><span class="token function">fromSecretKey</span><span class="token punctuation">(</span>\n  bs58<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token string">&quot;588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY</span>\n<span class="token keyword">const</span> alice <span class="token operator">=</span> Keypair<span class="token punctuation">.</span><span class="token function">fromSecretKey</span><span class="token punctuation">(</span>\n  bs58<span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span><span class="token string">&quot;4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 創建 Mint (發行自己的token)</span>\n\n<span class="token comment">// Mint的概念就像是Ethereum上的ERC-20的地址</span>\n<span class="token comment">// 換句話說，USDC、RAY、SRM ... 都是mint</span>\n\n<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token comment">// create a mint account</span>\n  <span class="token keyword">let</span> mint <span class="token operator">=</span> Keypair<span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">mint: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>mint<span class="token punctuation">.</span>publicKey<span class="token punctuation">.</span><span class="token function">toBase58</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  tx<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>\n    <span class="token comment">// create account</span>\n    SystemProgram<span class="token punctuation">.</span><span class="token function">createAccount</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      fromPubkey<span class="token operator">:</span> feePayer<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>\n      newAccountPubkey<span class="token operator">:</span> mint<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>\n      space<span class="token operator">:</span> <span class="token constant">MINT_SIZE</span><span class="token punctuation">,</span>\n      lamports<span class="token operator">:</span> <span class="token keyword">await</span> <span class="token function">getMinimumBalanceForRentExemptMint</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      programId<span class="token operator">:</span> <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token comment">// init mint</span>\n    <span class="token function">createInitializeMintInstruction</span><span class="token punctuation">(</span>\n      mint<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// 幣的地址</span>\n      <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 位數</span>\n      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// 增發幣的權限</span>\n      <span class="token keyword">null</span> <span class="token comment">// 冷凍帳戶的權限 (我們這邊先留null)</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">txhash: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">sendTransaction</span><span class="token punctuation">(</span>tx<span class="token punctuation">,</span> <span class="token punctuation">[</span>feePayer<span class="token punctuation">,</span> mint<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div>',2),t={},e=(0,a(3744).Z)(t,[["render",function(n,s){return p}]])},3744:(n,s)=>{s.Z=(n,s)=>{for(const[a,p]of s)n[a]=p;return n}}}]);