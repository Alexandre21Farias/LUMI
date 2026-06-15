import { supabase } from './supabase'

export interface User {
  id: string
  name: string
  email: string
  created_at?: string
}

export interface Child {
  id: string
  user_id: string
  name: string
  age: number
  photo_url?: string
  blood_type?: string
  allergies?: string
  created_at?: string
}

export interface Bracelet {
  id: string
  code: string
  child_id: string | null
  battery: number
  is_connected: boolean
  color?: string
  water_resistant?: boolean
  created_at?: string
}

export interface LocationPoint {
  id: string
  bracelet_id: string
  lat: number
  lng: number
  created_at: string
}

export interface Alert {
  id: string
  bracelet_id: string
  type: string
  resolved: boolean
  created_at: string
}

export interface EventHistory {
  id: string
  bracelet_id: string
  event_type: string
  description: string
  created_at: string
}

export interface SafeArea {
  id: string
  name: string
  lat: number
  lng: number
  radius: number
  created_at?: string
}

// Default Seed Data
const DEFAULT_USERS: User[] = [
  { id: '11111111-1111-1111-1111-111111111111', name: 'Alexandre Lima', email: 'admin@lumi.com' }
]

const DEFAULT_CHILDREN: Child[] = [
  {
    id: '22222222-2222-2222-2222-222222222222',
    user_id: '11111111-1111-1111-1111-111111111111',
    name: 'João Silva',
    age: 8,
    blood_type: 'O+',
    allergies: 'Nenhuma'
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    user_id: '11111111-1111-1111-1111-111111111111',
    name: 'Maria Souza',
    age: 6,
    blood_type: 'A+',
    allergies: 'Amendoim'
  }
]

const DEFAULT_BRACELETS: Bracelet[] = [
  {
    id: '33333333-3333-3333-3333-333333333333',
    code: 'LUMI-001',
    child_id: '22222222-2222-2222-2222-222222222222',
    battery: 87,
    is_connected: true,
    color: 'Azul bebê',
    water_resistant: true
  }
]

const DEFAULT_SAFE_AREAS: SafeArea[] = [
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'UNIFAN',
    lat: -12.25301,
    lng: -38.95669,
    radius: 300
  }
]

const DEFAULT_LOCATIONS: LocationPoint[] = [
  {
    id: 'l1',
    bracelet_id: '33333333-3333-3333-3333-333333333333',
    lat: -12.2510,
    lng: -38.9540,
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: 'l2',
    bracelet_id: '33333333-3333-3333-3333-333333333333',
    lat: -12.2520,
    lng: -38.9555,
    created_at: new Date(Date.now() - 40 * 60 * 1000).toISOString()
  },
  {
    id: 'l3',
    bracelet_id: '33333333-3333-3333-3333-333333333333',
    lat: -12.25301,
    lng: -38.95669,
    created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  }
]

const DEFAULT_EVENT_HISTORY: EventHistory[] = [
  {
    id: 'e1',
    bracelet_id: '33333333-3333-3333-3333-333333333333',
    event_type: 'GPS_CONNECTED',
    description: 'GPS conectado',
    created_at: new Date(Date.now() - 90 * 60 * 1000).toISOString()
  },
  {
    id: 'e2',
    bracelet_id: '33333333-3333-3333-3333-333333333333',
    event_type: 'LOCATION_UPDATE',
    description: 'Localização atualizada (Bio Hit)',
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: 'e3',
    bracelet_id: '33333333-3333-3333-3333-333333333333',
    event_type: 'LOCATION_UPDATE',
    description: 'Localização atualizada (Mercantil)',
    created_at: new Date(Date.now() - 40 * 60 * 1000).toISOString()
  },
  {
    id: 'e4',
    bracelet_id: '33333333-3333-3333-3333-333333333333',
    event_type: 'SAFE_AREA_ENTERED',
    description: 'Entrada em área segura: UNIFAN',
    created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  }
]

// Initialize LocalStorage with seed data if not present
const isBrowser = typeof window !== 'undefined'

const getLocal = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser) return defaultValue
  const item = localStorage.getItem(key)
  if (!item) {
    localStorage.setItem(key, JSON.stringify(defaultValue))
    return defaultValue
  }
  try {
    return JSON.parse(item)
  } catch {
    return defaultValue
  }
}

const setLocal = <T>(key: string, value: T) => {
  if (isBrowser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// Local Storage Keys
const KEY_USERS = 'lumi_db_users'
const KEY_CHILDREN = 'lumi_db_children'
const KEY_BRACELETS = 'lumi_db_bracelets'
const KEY_SAFE_AREAS = 'lumi_db_safe_areas'
const KEY_LOCATIONS = 'lumi_db_locations'
const KEY_ALERTS = 'lumi_db_alerts'
const KEY_EVENTS = 'lumi_db_events'

export const dbService = {
  // USERS
  async getUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase.from('users').select('*')
      if (error) throw error
      return data || []
    } catch {
      return getLocal(KEY_USERS, DEFAULT_USERS)
    }
  },

  // CHILDREN
  async getChildren(): Promise<Child[]> {
    try {
      const { data, error } = await supabase.from('children').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    } catch {
      return getLocal(KEY_CHILDREN, DEFAULT_CHILDREN)
    }
  },

  async getChildById(id: string): Promise<Child | null> {
    try {
      const { data, error } = await supabase.from('children').select('*').eq('id', id).single()
      if (error) throw error
      return data
    } catch {
      const list = getLocal<Child[]>(KEY_CHILDREN, DEFAULT_CHILDREN)
      return list.find(c => c.id === id) || null
    }
  },

  async saveChild(child: Partial<Child> & { name: string; age: number }): Promise<Child> {
    const adminId = '11111111-1111-1111-1111-111111111111'
    const newChild: Child = {
      id: child.id || crypto.randomUUID(),
      user_id: child.user_id || adminId,
      name: child.name,
      age: child.age,
      blood_type: child.blood_type || '',
      allergies: child.allergies || '',
      photo_url: child.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(child.name)}&background=2563eb&color=fff`
    }

    try {
      if (child.id) {
        const { error } = await supabase.from('children').update(newChild).eq('id', child.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('children').insert([newChild])
        if (error) throw error
      }
      return newChild
    } catch {
      const list = getLocal<Child[]>(KEY_CHILDREN, DEFAULT_CHILDREN)
      const index = list.findIndex(c => c.id === newChild.id)
      if (index > -1) {
        list[index] = newChild
      } else {
        list.unshift(newChild)
      }
      setLocal(KEY_CHILDREN, list)
      return newChild
    }
  },

  async deleteChild(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('children').delete().eq('id', id)
      if (error) throw error
      return true
    } catch {
      const list = getLocal<Child[]>(KEY_CHILDREN, DEFAULT_CHILDREN)
      const filtered = list.filter(c => c.id !== id)
      setLocal(KEY_CHILDREN, filtered)
      return true
    }
  },

  // BRACELETS
  async getBracelets(): Promise<Bracelet[]> {
    try {
      const { data, error } = await supabase.from('bracelets').select('*')
      if (error) throw error
      return data || []
    } catch {
      return getLocal(KEY_BRACELETS, DEFAULT_BRACELETS)
    }
  },

  async saveBracelet(bracelet: Partial<Bracelet> & { code: string }): Promise<Bracelet> {
    const newBracelet: Bracelet = {
      id: bracelet.id || crypto.randomUUID(),
      code: bracelet.code,
      child_id: bracelet.child_id || null,
      battery: bracelet.battery ?? 100,
      is_connected: bracelet.is_connected ?? true,
      color: bracelet.color || 'Azul',
      water_resistant: bracelet.water_resistant ?? false
    }

    try {
      if (bracelet.id) {
        const { error } = await supabase.from('bracelets').update(newBracelet).eq('id', bracelet.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('bracelets').insert([newBracelet])
        if (error) throw error
      }
      return newBracelet
    } catch {
      const list = getLocal<Bracelet[]>(KEY_BRACELETS, DEFAULT_BRACELETS)
      const index = list.findIndex(b => b.id === newBracelet.id)
      if (index > -1) {
        list[index] = newBracelet
      } else {
        list.unshift(newBracelet)
      }
      setLocal(KEY_BRACELETS, list)
      return newBracelet
    }
  },

  async deleteBracelet(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('bracelets').delete().eq('id', id)
      if (error) throw error
      return true
    } catch {
      const list = getLocal<Bracelet[]>(KEY_BRACELETS, DEFAULT_BRACELETS)
      const filtered = list.filter(b => b.id !== id)
      setLocal(KEY_BRACELETS, filtered)
      return true
    }
  },

  // SAFE AREAS
  async getSafeAreas(): Promise<SafeArea[]> {
    try {
      const { data, error } = await supabase.from('safe_areas').select('*')
      if (error) throw error
      return data || []
    } catch {
      return getLocal(KEY_SAFE_AREAS, DEFAULT_SAFE_AREAS)
    }
  },

  async saveSafeArea(area: Partial<SafeArea> & { name: string; lat: number; lng: number; radius: number }): Promise<SafeArea> {
    const newArea: SafeArea = {
      id: area.id || crypto.randomUUID(),
      name: area.name,
      lat: area.lat,
      lng: area.lng,
      radius: area.radius
    }

    try {
      if (area.id) {
        const { error } = await supabase.from('safe_areas').update(newArea).eq('id', area.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('safe_areas').insert([newArea])
        if (error) throw error
      }
      return newArea
    } catch {
      const list = getLocal<SafeArea[]>(KEY_SAFE_AREAS, DEFAULT_SAFE_AREAS)
      const index = list.findIndex(a => a.id === newArea.id)
      if (index > -1) {
        list[index] = newArea
      } else {
        list.push(newArea)
      }
      setLocal(KEY_SAFE_AREAS, list)
      return newArea
    }
  },

  async deleteSafeArea(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('safe_areas').delete().eq('id', id)
      if (error) throw error
      return true
    } catch {
      const list = getLocal<SafeArea[]>(KEY_SAFE_AREAS, DEFAULT_SAFE_AREAS)
      const filtered = list.filter(a => a.id !== id)
      setLocal(KEY_SAFE_AREAS, filtered)
      return true
    }
  },

  // LOCATIONS
  async getLocations(braceletId: string): Promise<LocationPoint[]> {
    try {
      const { data, error } = await supabase.from('locations').select('*').eq('bracelet_id', braceletId).order('created_at', { ascending: true })
      if (error) throw error
      return data || []
    } catch {
      const list = getLocal<LocationPoint[]>(KEY_LOCATIONS, DEFAULT_LOCATIONS)
      return list.filter(l => l.bracelet_id === braceletId)
    }
  },

  async addLocation(braceletId: string, lat: number, lng: number): Promise<LocationPoint> {
    const newLoc: LocationPoint = {
      id: crypto.randomUUID(),
      bracelet_id: braceletId,
      lat,
      lng,
      created_at: new Date().toISOString()
    }

    try {
      const { error } = await supabase.from('locations').insert([newLoc])
      if (error) throw error
      return newLoc
    } catch {
      const list = getLocal<LocationPoint[]>(KEY_LOCATIONS, DEFAULT_LOCATIONS)
      list.push(newLoc)
      setLocal(KEY_LOCATIONS, list)
      return newLoc
    }
  },

  // ALERTS
  async getAlerts(): Promise<Alert[]> {
    try {
      const { data, error } = await supabase.from('alerts').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    } catch {
      return getLocal(KEY_ALERTS, [])
    }
  },

  async addAlert(braceletId: string, type: 'SOS' | 'OUT_OF_BOUNDS'): Promise<Alert> {
    const newAlert: Alert = {
      id: crypto.randomUUID(),
      bracelet_id: braceletId,
      type,
      resolved: false,
      created_at: new Date().toISOString()
    }

    try {
      const { error } = await supabase.from('alerts').insert([newAlert])
      if (error) throw error
      return newAlert
    } catch {
      const list = getLocal<Alert[]>(KEY_ALERTS, [])
      list.unshift(newAlert)
      setLocal(KEY_ALERTS, list)
      return newAlert
    }
  },

  async resolveAlert(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('alerts').update({ resolved: true }).eq('id', id)
      if (error) throw error
      return true
    } catch {
      const list = getLocal<Alert[]>(KEY_ALERTS, [])
      const index = list.findIndex(a => a.id === id)
      if (index > -1) {
        list[index].resolved = true
        setLocal(KEY_ALERTS, list)
      }
      return true
    }
  },

  // EVENT HISTORY
  async getEventHistory(): Promise<EventHistory[]> {
    try {
      const { data, error } = await supabase.from('event_history').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    } catch {
      return getLocal(KEY_EVENTS, DEFAULT_EVENT_HISTORY)
    }
  },

  async addEvent(braceletId: string, event_type: string, description: string): Promise<EventHistory> {
    const newEvent: EventHistory = {
      id: crypto.randomUUID(),
      bracelet_id: braceletId,
      event_type,
      description,
      created_at: new Date().toISOString()
    }

    try {
      const { error } = await supabase.from('event_history').insert([newEvent])
      if (error) throw error
      return newEvent
    } catch {
      const list = getLocal<EventHistory[]>(KEY_EVENTS, DEFAULT_EVENT_HISTORY)
      list.unshift(newEvent)
      setLocal(KEY_EVENTS, list)
      return newEvent
    }
  }
}
