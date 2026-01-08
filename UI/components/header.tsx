"use client"

import { useState } from "react"
import { Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">CardioPredict</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#predict" className="text-muted-foreground hover:text-foreground transition-colors">
                Predict
              </a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setSignInOpen(true)}
              >
                Sign In
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started
              </Button>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-4">
                <a href="#predict" className="text-muted-foreground hover:text-foreground transition-colors">
                  Predict
                </a>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How it Works
                </a>
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Button variant="ghost" className="justify-start" onClick={() => setSignInOpen(true)}>
                    Sign In
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground"
                    onClick={() => {
                      document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" })
                      setMobileMenuOpen(false)
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Coming Soon</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This functionality will be available soon.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
