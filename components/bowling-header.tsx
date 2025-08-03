// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetTitle,
//   SheetDescription,
// } from "@/components/ui/sheet";
// import { Menu, Phone } from "lucide-react";
// import { BowlingBookingModal } from "@/components/bowling-booking-modal";
// import Image from "next/image";
// import { VisuallyHidden } from "@/components/ui/visually-hidden";

// export default function BowlingHeader() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isBookingOpen, setIsBookingOpen] = useState(false);

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm text-white border-transparent border-b bg-black/20">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-20">
//             <Link href="/bowling" className="flex items-center space-x-2">
//               <Image
//                 src="/Logo.webp"
//                 alt="Logo"
//                 width={70}
//                 height={70}
//                 priority={true}
//               />
//             </Link>

//             <nav className="hidden lg:flex items-center space-x-8">
//               <Link
//                 href="/bowling#menu"
//                 className="text-white hover:text-orange-400 transition-colors"
//               >
//                 Меню
//               </Link>
//               <Link
//                 href="/bowling#prices"
//                 className="text-white hover:text-orange-400 transition-colors"
//               >
//                 Цены
//               </Link>
//               <Link
//                 href="/bowling#gallery"
//                 className="text-white hover:text-orange-400 transition-colors"
//               >
//                 Интерьер
//               </Link>
//               <Link
//                 href="/bowling/events"
//                 className="text-white hover:text-orange-400 transition-colors"
//               >
//                 События
//               </Link>
//               <Link
//                 href="/club"
//                 className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
//               >
//                 Клуб
//               </Link>
//             </nav>

//             {/* Contact Info */}
//             <div className="hidden lg:flex items-center space-x-4">
//               <div className="flex items-center space-x-2 text-sm text-white">
//                 <Link
//                   href="tel:+375291867825"
//                   className="flex items-center justify-center"
//                 >
//                   <Phone className="mr-2 w-5 h-5" />
//                   +375 (29) 186-78-25
//                 </Link>
//               </div>
//               <Button
//                 onClick={() => setIsBookingOpen(true)}
//                 className="bg-orange-500 hover:bg-orange-600"
//               >
//                 Забронировать
//               </Button>
//             </div>

//             {/* Mobile Menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild className="lg:hidden">
//                 <Button variant="ghost" size="icon" className="text-white">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="right"
//                 className="bg-slate-900 text-white border-slate-800"
//               >
//                 <VisuallyHidden>
//                   <SheetTitle>Мобильное меню</SheetTitle>
//                   <SheetDescription>
//                     Навигация по разделам сайта
//                   </SheetDescription>
//                 </VisuallyHidden>
//                 <div className="flex flex-col space-y-6 mt-8">
//                   <Link
//                     href="/bowling#menu"
//                     className="text-lg hover:text-orange-400 transition-colors"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Меню
//                   </Link>
//                   <Link
//                     href="/bowling#prices"
//                     className="text-lg hover:text-orange-400 transition-colors"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Цены
//                   </Link>
//                   <Link
//                     href="/bowling#gallery"
//                     className="text-lg hover:text-orange-400 transition-colors"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Интерьер
//                   </Link>
//                   <Link
//                     href="/bowling/events"
//                     className="text-lg hover:text-orange-400 transition-colors"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     События
//                   </Link>
//                   <Link
//                     href="/club"
//                     className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-center"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Клуб
//                   </Link>
//                   <div className="pt-4 border-t border-slate-700">
//                     <div className="flex items-center space-x-2 text-sm mb-4">
//                       <Phone className="w-4 h-4" />
//                       <span>+375 (29) 123-45-67</span>
//                     </div>
//                     <Button
//                       onClick={() => {
//                         setIsOpen(false);
//                         setIsBookingOpen(true);
//                       }}
//                       className="bg-orange-500 hover:bg-orange-600 w-full"
//                     >
//                       Забронировать
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </header>

//       {/* Booking Modal */}
//       <BowlingBookingModal
//         isOpen={isBookingOpen}
//         onClose={() => setIsBookingOpen(false)}
//       />
//     </>
//   );
// }
