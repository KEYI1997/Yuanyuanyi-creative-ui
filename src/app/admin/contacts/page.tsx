"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Mail, Phone, RefreshCw, Trash2 } from "lucide-react";

interface Contact { id: string; name: string; phone: string; email: string | null; company: string | null; service_type: string | null; description: string | null; read: boolean; created_at: string; }

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const fetchContacts = useCallback(async () => {
    setLoading(true); setNotice("");
    const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    if (error) setNotice("目前無法載入資料，請稍後再試。");
    else setContacts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    void supabase.from("contacts").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (!active) return;
      if (error) setNotice("目前無法載入資料，請稍後再試。");
      else setContacts(data ?? []);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  async function toggleRead(id: string, currentRead: boolean) {
    const { error } = await supabase.from("contacts").update({ read: !currentRead }).eq("id", id);
    if (error) return setNotice("狀態更新失敗，請再試一次。");
    setContacts((current) => current.map((item) => item.id === id ? { ...item, read: !currentRead } : item));
  }

  async function deleteContact(id: string) {
    if (!window.confirm("確定要刪除這筆詢問嗎？刪除後無法復原。")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) return setNotice("刪除失敗，請再試一次。");
    setContacts((current) => current.filter((item) => item.id !== id));
  }

  const unreadCount = contacts.filter((contact) => !contact.read).length;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold tracking-[.14em] text-cta">INQUIRIES</p><h1 className="mt-2 text-3xl sm:text-4xl">聯絡表單</h1><p className="mt-2 text-sm text-muted">共 {contacts.length} 筆，{unreadCount} 筆尚未讀取</p></div>
        <button onClick={() => void fetchContacts()} disabled={loading} className="inline-flex items-center gap-2 self-start border border-border bg-white px-4 py-2.5 text-sm font-medium transition hover:border-cta hover:text-cta disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} />重新整理</button>
      </div>

      <div aria-live="polite" className={`mt-4 min-h-6 text-sm ${notice ? "text-red-700" : "text-muted"}`}>{notice}</div>

      {loading ? (
        <div className="mt-8 space-y-3" aria-label="載入中">{[1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse border border-border bg-white/65" />)}</div>
      ) : contacts.length === 0 ? (
        <div className="mt-8 border border-dashed border-border bg-white/45 py-20 text-center"><p className="font-heading text-2xl text-primary">目前沒有新詢問</p><p className="mt-2 text-sm text-muted">網站表單送出後，資料會顯示在這裡。</p></div>
      ) : (
        <div className="mt-5 divide-y divide-border border-y border-border">
          {contacts.map((contact) => (
            <article key={contact.id} className={`grid gap-5 py-6 sm:grid-cols-[1fr_auto] sm:px-3 ${contact.read ? "" : "bg-white/60"}`}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {!contact.read && <span className="bg-cta px-2 py-1 text-[10px] font-bold tracking-wide text-white">NEW</span>}
                  <h2 className="font-body text-lg font-semibold tracking-normal">{contact.name}</h2>
                  {contact.company && <span className="text-sm text-muted">／ {contact.company}</span>}
                  {contact.service_type && <span className="border border-border bg-bg-alt px-2 py-1 text-xs text-accent">{contact.service_type}</span>}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 hover:text-cta"><Phone size={13} />{contact.phone}</a>
                  {contact.email && <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-cta"><Mail size={13} />{contact.email}</a>}
                  <time className="text-xs">{new Date(contact.created_at).toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" })}</time>
                </div>
                {contact.description && <p className="mt-4 max-w-3xl border-l-2 border-warm pl-4 text-sm leading-7 text-primary-light">{contact.description}</p>}
              </div>
              <div className="flex items-start gap-1">
                <button onClick={() => void toggleRead(contact.id, contact.read)} className="grid h-9 w-9 place-items-center text-muted transition hover:bg-white hover:text-cta" title={contact.read ? "標為未讀" : "標為已讀"} aria-label={contact.read ? "標為未讀" : "標為已讀"}>{contact.read ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                <button onClick={() => void deleteContact(contact.id)} className="grid h-9 w-9 place-items-center text-muted transition hover:bg-red-50 hover:text-red-700" title="刪除" aria-label={`刪除 ${contact.name} 的詢問`}><Trash2 size={16} /></button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
