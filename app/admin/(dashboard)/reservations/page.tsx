'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Check, X, Clock, Trash2 } from 'lucide-react'
import type { Reservation } from '@/lib/types'

export default function ReservationsAdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  const supabase = createClient()

  const fetchReservations = async () => {
    let query = supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data } = await query
    setReservations(data || [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchReservations()
  }, [filter])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('reservations').update({ status }).eq('id', id)
    fetchReservations()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this reservation?')) {
      await supabase.from('reservations').delete().eq('id', id)
      fetchReservations()
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Confirmed</Badge>
      case 'cancelled':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Cancelled</Badge>
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Reservations
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage restaurant bookings
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-secondary/50">
              <TableHead className="text-muted-foreground">Guest</TableHead>
              <TableHead className="text-muted-foreground">Date & Time</TableHead>
              <TableHead className="text-muted-foreground">Guests</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No reservations found.
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((reservation) => (
                <TableRow
                  key={reservation.id}
                  className="border-border hover:bg-secondary/30"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {reservation.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.email}
                      </p>
                      {reservation.phone && (
                        <p className="text-sm text-muted-foreground">
                          {reservation.phone}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-foreground">{formatDate(reservation.date)}</p>
                    <p className="text-sm text-primary">{reservation.time}</p>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}
                  </TableCell>
                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {reservation.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStatus(reservation.id, 'confirmed')}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            title="Confirm"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStatus(reservation.id, 'cancelled')}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {reservation.status === 'confirmed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateStatus(reservation.id, 'pending')}
                          className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                          title="Mark Pending"
                        >
                          <Clock className="w-4 h-4" />
                        </Button>
                      )}
                      {reservation.status === 'cancelled' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateStatus(reservation.id, 'confirmed')}
                          className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          title="Reconfirm"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(reservation.id)}
                        className="text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {reservations.some((r) => r.special_requests) && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
            Special Requests
          </h2>
          <div className="space-y-4">
            {reservations
              .filter((r) => r.special_requests)
              .map((reservation) => (
                <div
                  key={reservation.id}
                  className="p-4 bg-secondary rounded-lg"
                >
                  <p className="text-sm font-medium text-foreground">
                    {reservation.name} - {formatDate(reservation.date)} at{' '}
                    {reservation.time}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {reservation.special_requests}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
