import { useEffect, useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services.js/article'

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });
    const [allArticles, setAllArticles] = useState([]);

    const [copied, setCopied] = useState('')

    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
          localStorage.getItem("articles")
        );
    
        if (articlesFromLocalStorage) {
          setAllArticles(articlesFromLocalStorage);
        }
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url }) 
        //console.log('handleSumit', 'we got the getSummary', data)
        if(data?.summary){
            //console.log('handleSumit', 'inside the data?.summary')
            const newArticle = { ...article, summary: data.summary };
            //console.log(newArticle, allArticles, 'inside the handleSubmit')
            const updatedAllArticles = [newArticle, ...allArticles];
            
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            

            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        } 
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            handleSubmit(e);
        }
    }

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    }

    //console.log(article, 'Article')
    //console.log(...allArticles, 'All articles')

  return (
    <section className='mt-16 w-full max-w-xl'>
        {/*Search*/}
        <div className='flex flex-col w-full gap-2'>
            <form 
                className='relative flex justify-center items-center'
                onSubmit={handleSubmit}
            >
                <img 
                    src={linkIcon}
                    alt="link_icon"
                    className='absolute left-0 my-2 ml-3 w-5'
                />
                <input
                    type='url'
                    placeholder='Enter a URL'
                    value={article.url}
                    onChange={(e) => setArticle({...article, url: e.target.value})}
                    onKeyDown={handleKeyDown}
                    required
                    className='block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg 
                    font-medium focus:border-black focus:outline-none focus:ring-0 peer'
                />
                <button
                    type='submit'
                    className='hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center 
                    justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400; peer-focus:border-gray-700 peer-focus:text-gray-700'
                >
                    <p>↵</p>
                </button>
            </form>
            {/*Browse URL History*/}
            <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                {allArticles.length > 0 && allArticles.map((item, index) => (
                    <div key={`links-${index}`}
                        onClick={() => setArticle(item)}
                        className='p-3 flex justify-start items-center flex-row bg-white-border
                         border-gray-200 gap-3 rounded-lg cursor-pointer bg-white w-fit'
                    >
                        <div className='flex items-center' onClick={() => handleCopy(item.url)}>
                            <img src={ copied === item.url ? tick : copy}
                                alt='copy_icon'
                                className='w-[35px] h-[35px] object-contain bg-gray-100 rounded-md p-2'
                            />
                            <p className='ml-3 flex-1 font-satoshi text-blue-700 font-medium text-sm truncate w-[500px]'>
                                {item.url}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/*Display Results*/}
        <div className='my-10 max-full flex justify-center items-center'>
            {isFetching ? (
            <img src={loader} alt='loader' className='w-20'/> 
            ) :  error ? (
                <p className='font-inter font-bold text-black text-center'>
                    Well, that wasn't supposed to happen
                    <br/>
                    <span className='font-satoshi font-normal text-gray-700'>
                        {error?.data?.error}
                    </span>
                </p>
            ) : (
                article.summary && (
                    <div className='flex flex-col gap-3'>
                        <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                            Article 
                            <span className='font-black bg-gradient-to-r from-blue-600 to-cyan-600 
                            bg-clip-text text-transparent ml-1'>
                               Summary
                            </span>
                        </h2>   
                        <div className='round-xl border border-gray-200 bg-white/20 
                        shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4'>
                            <p className='font-inter font-medium text-sm text-gray-700'>
                                {article.summary}
                            </p>
                        </div>
                    </div>
                )
            )
        }
        </div>           
    </section>
  )
}

export default Demo