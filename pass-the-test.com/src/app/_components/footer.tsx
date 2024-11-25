// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 p-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">&copy; {new Date().getFullYear()} PassTheTest.com. All rights reserved.</p>
        </div>
        
        <div className="flex space-x-4">
          <a href="/contact" className="text-sm hover:underline">
            Contact Us
          </a>
          <a href="/contact#_Private_Policy" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="/contact#_Terms_and_Conditions" className="text-sm hover:underline">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
