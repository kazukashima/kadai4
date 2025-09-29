import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://fcprvfqkarihashzngrg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcHJ2ZnFrYXJpaGFzaHpuZ3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NzQwOTUsImV4cCI6MjA3MTA1MDA5NX0.AgfO4_wmt0Y9PfaB5XrlP_NTnAlQWSXXobD52_gTSKw'
)

async function main() {

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const iso = yesterday.toISOString()
  const dateStr = iso.split('T')[0]

  console.log('削除対象日:', dateStr)

  const {error:skillError}=await supabase.from('skills').delete().lt('created_at',`${dateStr}T23:59:59`)

  const { error:userError } = await supabase
    .from('users')
    .delete()
    .lt('created_at', `${dateStr}T23:59:59`)

    if(skillError){
      console.log('スキル削除エラー:',skillError)
    }else{
      console.log('Old skills deleted')
    }

  if (userError) {
    console.error('削除エラー:', userError)
  } else {
    console.log('Old users deleted')
  }


  const {}
}


main()
