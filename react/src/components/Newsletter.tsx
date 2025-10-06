export default function Newsletter() {
  return (
    <section className="bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-box bg-base-100 border border-base-300 p-6 md:p-10 text-center">
          <h3 className="text-2xl font-bold">Kampanyaları Kaçırmayın</h3>
          <p className="mt-2 text-base-content/70">Haftalık indirimler ve yeni ürünlerden ilk siz haberdar olun.</p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input type="email" required placeholder="E-posta adresiniz" className="input input-bordered w-full sm:w-96" />
            <button className="btn btn-primary">Abone Ol</button>
          </form>
        </div>
      </div>
    </section>
  );
}


