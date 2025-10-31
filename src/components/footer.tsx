export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-2">TICKETLESS</h3>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="mailto:hello@ticketless.app" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="mb-4 font-semibold text-foreground">
            <strong>IMPORTANT DISCLAIMER:</strong> All information provided by Ticketless is for estimation purposes only and does not replace official street signs or parking regulations. Ticketless and its creators assume no liability for parking tickets, violations, or any damages resulting from the use of this service.
          </p>
          <p>© 2025 TICKETLESS. Made with ❤️ in San Francisco.</p>
        </div>
      </div>
    </footer>
  )
}
