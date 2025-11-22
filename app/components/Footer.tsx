import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const categories = ["Technology", "Design", "Lifestyle", "Travel"];
  const company = ["About Us", "Contact", "Careers", "Privacy Policy"];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* ブランド説明 */}
          <div>
            <h3 className="text-foreground mb-4">The Blog</h3>
            <p className="text-muted-foreground">
              Sharing stories, ideas, and insights on technology, design, and modern living.
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <h4 className="text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h4 className="text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SNSリンク */}
          <div>
            <h4 className="text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                 <Icon size={20} color="gray" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2025 The Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
